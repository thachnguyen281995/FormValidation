// Mong muốn 
const btn = document.querySelector('.form-submit')
const form = document.querySelector('form')
// Đối tượng `Validator`
function Validator(options){
    function validate(inputElement,rule){
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector('.form-message')

                      
        if(errorMessage){
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else{
         errorElement.innerText = '';
         inputElement.parentElement.classList.remove('invalid')
        }
    }
    var getElement = document.querySelector(options.form);
    if(getElement){
        console.log(options.rules)
        if(getElement){
            options.rules.forEach(function(rule){
                var inputElement = document.querySelector(rule.selector)
                    inputElement.onblur = function(){
                        validate(inputElement,rule);
                    } 
                    inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                
            });
        }
    }
}
// Định nghĩa các rules
Validator.isRequired = function(selector){  
    return {
        selector: selector, 
        test : function(value){
            return value.trim() ? undefined : 'Vui long nhap lai'
        }
    }
}
Validator.isEmail = function(selector){
    return{
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui long nhap Email'
        }
    }
}
Validator.minlength = function(selector,min){
    return{
        selector: selector,
        test: function(value){
            return value.length >=min ? undefined : `Vui long nhap toi thieu ${min} ki tu`
        }
    }
}
form.addEventListener('submit',function(e){
    e.preventDefault();
})

