$(document).ready(function(e){
    user = JSON.parse(localStorage.getItem("user"))
    console.log(user[0])
    username = user[0]['username']
    $.ajax({
        url: 'php/profile.php',
        type: 'post',
        data: 
            {   username:username, page : 'login' 
            },
        success: function(response){
            
            if(response == "Success"){
                $("#username").text(username)
                $.ajax({
                    url: 'php/profile.php',
                    type: 'post',
                    data: 
                        {   username:username, page : 'profile_view'
                        },
                    success: function(response){
                        
                        profile = JSON.parse(response);
                        $("#txt_age").val(profile['age'])
                        $("#txt_dob").val(profile['dob'])
                        $("#txt_contact").val(profile['contact'])
                    }
                })
            }else{
                window.location.href="login.html"
            }
        }
    })
})


$(document).on('click','#btn_profile_update',function(e){ 
    e.preventDefault();
    
    var age = $('#txt_age').val(); 
    var dob = $('#txt_dob').val();
    var contact = $('#txt_contact').val();
     
     		
    $.ajax({
        url: 'php/profile.php',
        type: 'post',
        data: 
            {    username:username, page : 'profile_update', age : age, dob : dob, contact : contact
            },
        success: function(response){
            if(response == "Success"){ 
                window.location.href = "profile.html";
            }else{
                $('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button> Fail to Login    </div>');
            }
        }
    }); 
});

$(document).on('click','#btn_logout',function(e){ 
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href="login.html"
});