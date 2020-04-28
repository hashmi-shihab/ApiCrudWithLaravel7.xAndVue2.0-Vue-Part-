var app = new Vue({
	el: '#root',
	data:{
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {username: "", email: "", mobile: ""},
		clickedUser: {},
	},
	mounted(){
		console.log("mounted")
		this.getAllUsers();
	},
	methods: {
		getAllUsers: function(){
			axios.get("http://127.0.0.1:8000/api/crudUser")
			.then(function(response){
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.users = response.data;
				}
			});
		},

		saveUser: function(){
			// console.log(app.newUser);
			var formData = app.toFormData(app.newUser);

			axios.post("http://127.0.0.1:8000/api/crudUser", formData)
			.then(function(response){
				
				app.newUser = {username: "", email: "", mobile: ""};

				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.getAllUsers();
				}
			});
		},

		updateUser: function(){
			//console.log(app.newUser);
			/*var formData = app.toFormData(app.clickedUser);*/
			var formData =app.clickedUser;
			var id = app.clickedUser.id;
			axios.put("http://127.0.0.1:8000/api/crudUser/"+id, formData)
			.then(function(response){				
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getAllUsers();
				}
			});
		},

		deleteUser: function(){
			//console.log(app.newUser);
			/*var formData = app.toFormData(app.clickedUser);*/
			var id = app.clickedUser.id;
			axios.delete("http://127.0.0.1:8000/api/crudUser/"+id,)
			.then(function(response){				
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getAllUsers();
				}
			});
		},

		selectUser(user){
			app.clickedUser = user;
		},

		toFormData: function(obj){
			var form_data = new FormData();
		      for ( var key in obj ) {
		          form_data.append(key, obj[key]);
		      } 
		      return form_data;
		},

		clearMessage: function(){
			app.errorMessage = "";
			app.successMessage = "";
		}
	}
})