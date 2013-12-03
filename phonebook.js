$(document).ready(function () {

    // Добовление контакта - function
    function add(newContact) {
        contacts.push(newContact);
        showContacts();
    }

    // Вывод контактов - function
    function showContacts() {
        $('.table-contacts .table tbody').empty();
        $.each(contacts, function (index, contact) {
            var blockKnopok = $("<div>").addClass('btn-block');
            var buttonEdit = $("<button>").addClass('btn btn-success button-success btn-edit-contact').text('Edit');
            var buttonDelit = $("<button>").addClass('btn btn-danger button-remove').text('Delete');
            blockKnopok.append(buttonEdit);
            blockKnopok.append(buttonDelit);

            var tr = $("<tr>").data("id",contact.phoneNumber);
            var tdFirstName = $("<td>").text(contact.firstName);
            var tdLastName = $("<td>").text(contact.lastName);
            var tdOperator = $("<td>").text(contact.operator);
            var tdPhoneNumber = $("<td>").addClass('phone-number').text(contact.phoneNumber);
            var tdAction = $("<td>").append(blockKnopok);

            tr.append(tdFirstName);
            tr.append(tdLastName);
            tr.append(tdOperator);
            tr.append(tdPhoneNumber);
            tr.append(tdAction);

            $('.table-contacts .table tbody').append(tr);
        })
    }

    // Удоление контакта - function
    function remove(telephone) {
        var indexDelit;
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber == telephone) {
                indexDelit = index;
            };
        })
        contacts.splice(indexDelit, 1);
        showContacts();
    }

    // Редактирование контакта - function
    function redactContact(oldPhone, newContact) {
        $.each(contacts, function (index, contact) {  
            if (contact.phoneNumber == oldPhone) {
                contact.firstName = newContact.firstName;
                contact.lastName = newContact.lastName;
                contact.operator = newContact.operator;
                contact.phoneNumber = newContact.phoneNumber;
            };
        })
        showContacts();
    }


    var contacts = [{
        firstName: "Дима",
        lastName: "Белов",
        operator: "093",
        phoneNumber: "0631346611"
    }, {
        firstName: "Александр",
        lastName: "Соловей",
        operator: "067",
        phoneNumber: "911"
    }];

    // Вывод контактов
    showContacts(); 

    // Открытие формы добовления контакта
    $('.add-contact').click(function () {
        $('.blockFormAddContact .addNewContact input[name=first-name], input[name=last-name], input[name=phone-number]').val('');
        $('.blockFormAddContact').fadeIn();
        $('.blockFormAddContact').animate({
            'top': 150
        },'fast') 
    })

    // Создание пользователя
    $('.blockFormAddContact .addNewContact').submit( function (event) {
        event.preventDefault();

        var firstName = $('.blockFormAddContact input[name=first-name]').val();
        var lastName = $('.blockFormAddContact input[name=last-name]').val();
        var operator = $('.blockFormAddContact select[name=operator]').val();   
        var phoneNumber = $('.blockFormAddContact input[name=phone-number]').val();

        var contactFinde = false;
        $.each(contacts,function (index, contact) {
            if (contact.phoneNumber==phoneNumber) {
                $('.save-error').fadeIn();
                contactFinde = true;
                
                $('.save-error button').click(function () {
                    $('.save-error').remove();
                    $(".blockFormAddContact").animate({
                        'top': 0
                    },'fast').fadeOut(); 
                    $('.blockFormRedact').fadeIn();
                    $('.blockFormRedact').animate({
                        'top': 150
                    },'fast')

                    $('.blockFormRedact input[name=first-name]').val(firstName);
                    $('.blockFormRedact input[name=last-name]').val(lastName);
                    $('.blockFormRedact select[name=operator]').val(operator);   
                    $('.blockFormRedact input[name=phone-number]').val(phoneNumber);

                    $('.blockFormRedact').submit(function (event) {
                        event.preventDefault();

                        var firstName = $('.blockFormRedact input[name=first-name]').val();
                        var lastName = $('.blockFormRedact input[name=last-name]').val();
                        var phoneNumber = $('.blockFormRedact input[name=phone-number]').val();
                        var operator = $('.blockFormRedact select[name=operator]').val();   

                        redactContact(phoneNumber, {
                            firstName: firstName,
                            lastName: lastName,
                            operator: operator,
                            phoneNumber: phoneNumber
                        })
                        $('.blockFormRedact').animate({
                            'top': 0
                        },'fast').fadeOut();
                    })
                })
                return false;   
            }
        })

        if (!contactFinde) {
            if (!firstName) {
                alert('Введите имя');
                return;
            };
            if (!lastName) {
                alert('Введите фамилию');
                return;
            };
            if (!phoneNumber) {
                alert('Введите телефон');
                return;
            };
            if (firstName && lastName && operator && phoneNumber) {
            add({
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber
                })
                $(".blockFormAddContact").animate({
                    'top': 0
                },'fast').fadeOut(); 
            }
        };
    })

    // Открытие и закрытие формы редактирования контакта
    // Открытие
    $('body').on('click', '.table-contacts .table .btn-edit-contact', function (e) {
        $('.blockFormRedact').fadeIn();
        $('.blockFormRedact').animate({
            'top': 150
        })
        var oldPhoneNumber = $(e.currentTarget).closest('tr').find('.phone-number').text();
        $.each(contacts, function (index, contact) {
            if (contact.phoneNumber==oldPhoneNumber) {
                $('.blockFormRedact input[name=first-name]').val(contact.firstName);
                $('.blockFormRedact input[name=last-name]').val(contact.lastName);
                $('.blockFormRedact select[name=operator]').val(contact.operator); 
                $('.blockFormRedact input[name=phone-number]').val(contact.phoneNumber);
            };
        })
        $('.blockFormRedact').submit(function (event) {
            event.preventDefault();

            var firstName = $('.blockFormRedact input[name=first-name]').val();
            var lastName = $('.blockFormRedact input[name=last-name]').val();
            var operator = $('.blockFormRedact select[name=operator]').val(); 
            var phoneNumber = $('.blockFormRedact input[name=phone-number]').val();

            redactContact(oldPhoneNumber, {
                firstName: firstName,
                lastName: lastName,
                operator: operator,
                phoneNumber: phoneNumber
            })
            $('.blockFormRedact').animate({
                    'top': 0
            },'fast');
            $('.blockFormRedact').fadeOut();
        })
    })
    // Закрытие
    $('body').on('click', '.button-krest', function () {
        $(".blockFormAddContact, .blockFormRedact").animate({
            'top': 0
        },'fast').fadeOut();
    })


    // Удоление контакта
    $('body').on('click', '.table-contacts .button-remove', function (e) {
        var $target = $(e.currentTarget);
        var phoneNumber = $target.closest('tr').data("id");
        console.log(phoneNumber);
        remove(phoneNumber);
    })

    // Редактирование контакта
    // $('body').on('click','.blockFormRedact', function () {
    //     var oldPhoneNumber = "911";
    //     redactContact(oldPhoneNumber, {
    //         firstName: "45",
    //         lastName: "156845",
    //         operator: "6",
    //         phoneNumber: "5"
    //     }) 
    // });



})