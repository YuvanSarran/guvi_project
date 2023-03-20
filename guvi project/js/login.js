
$(document).on('click','#btn_signin',function(e){ 
    e.preventDefault();
    
    var username = $('#txt_username').val(); 
    var password = $('#txt_password').val();
     
    
    if(username == ''){ // check username not empty
        alert('please enter username !!'); 
    }
    else if(!/^[a-z A-Z]+$/.test(username)){ // check username allowed capital and small letters 
        alert('username only capital and small letters are allowed !!'); 
    }
    else if(password == ''){ //check password not empty
        alert('please enter password !!'); 
    }
    else{			
        $.ajax({
            url: 'php/login.php',
            type: 'post',
            data: 
                {   username:username,  
                    password:password
                },
            success: function(response){
                if(response == "Success"){
                    var a = new Array();
                    a.push({username: username, password: password});
                    
                    localStorage.setItem('user',JSON.stringify(a));
                     
                    window.location.href = "profile.html";
                }else{
                    $('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button> Fail to Login    </div>');
                }
            }
        });
        
        $('#btn_signin')[0].reset();
    }
});

$(document).on('click', '#btn_register_form', function(e){
    window.location.href="register.html"
});
 