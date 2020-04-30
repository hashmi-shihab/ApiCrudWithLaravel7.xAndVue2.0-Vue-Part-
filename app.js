var app = new Vue({
	el: '#root',
	data:{
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessages: [],
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
			this.clearMessage();
			// console.log(app.newUser);
			/*var formData = app.toFormData(app.newUser);*/
			var formData = app.newUser;
			// console.log(app.newUser);
			axios.post("http://127.0.0.1:8000/api/crudUser", formData)
			.then(response => {
		      // console.log(response);
		      app.newUser = {};
		      app.getAllUsers();
		      app.successMessage = response.data.message; 
		    })
		    .catch(error => {
		    	// console.log(error.response);
		    	/*app.newUser = {};*/
		    	var uNameErrors = error.response.data.errors.username;
		      	var emailErrors = error.response.data.errors.email;
		      	var mobileErrors = error.response.data.errors.mobile;

		      if (uNameErrors) {
		      		for (var index in uNameErrors) {   
  							app.errorMessages.push(uNameErrors[index]);
						}
		      }
		      if (emailErrors) {
		      		for (var index in emailErrors) {    
  							app.errorMessages.push(emailErrors[index]);
						}
		      }
		      if (mobileErrors) {
		      		for (var index in mobileErrors) {    
  							app.errorMessages.push(mobileErrors[index]);
						}
		      }
		    });
		},

		updateUser: function(){
			this.clearMessage();
			var formData =app.clickedUser;
			var id = app.clickedUser.id;
			axios.put("http://127.0.0.1:8000/api/crudUser/"+id, formData)
			.then(response =>{				
				app.clickedUser = {};
				app.getAllUsers();
		      	app.successMessage = response.data.message; 
			})
			.catch(error => {
		    	var uNameErrors = error.response.data.errors.username;
		      	var emailErrors = error.response.data.errors.email;
		      	var mobileErrors = error.response.data.errors.mobile;

		      if (uNameErrors) {
		      		for (var index in uNameErrors) {   
  							app.errorMessages.push(uNameErrors[index]);
						}
		      }
		      if (emailErrors) {
		      		for (var index in emailErrors) {    
  							app.errorMessages.push(emailErrors[index]);
						}
		      }
		      if (mobileErrors) {
		      		for (var index in mobileErrors) {    
  							app.errorMessages.push(mobileErrors[index]);
						}
		      }
		    });
		},

		deleteUser: function(){
			this.clearMessage();
			var id = app.clickedUser.id;
			axios.delete("http://127.0.0.1:8000/api/crudUser/"+id,)
			.then(response=>{				
				app.clickedUser = {};
				app.successMessage = response.data.message; 
				app.getAllUsers();
			});
		},

		selectUser(user){
			app.clickedUser = user;
		},

		clearMessage: function(){
			app.errorMessages = [];
			app.successMessage = "";
		}
	}

})
