async function create() {
    $('#addUser').click(async () => {
        $('.alert').remove();
        let addUserForm = $('#addForm')
        let nameInt = addUserForm.find('#nameCreate');
        let lastnameInt = addUserForm.find('#lastnameCreate');
        let ageInt = addUserForm.find('#ageCreate');
        let emailInt = addUserForm.find('#emailCreate');
        let passwordInt = addUserForm.find('#passwordCreate');

        let name = nameInt.val().trim();
        let lastname = lastnameInt.val().trim();
        let age = ageInt.val().trim();
        let email = emailInt.val().trim();
        let password = passwordInt.val().trim();
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#rolesCreate').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let data = {
            name: name,
            lastname: lastname,
            age: age,
            email: email,
            password: password,
            roles: checkedRoles()
        }
        const response = await userFetch.addNewUser(data);
        if (response.ok) {
            await getUsers();
            nameInt.val('');
            lastnameInt.val('');
            ageInt.val('');
            emailInt.val('');
            passwordInt.val('');
            addUserForm.find(checkedRoles()).val('');
            let alert = `<div class="alert alert-success alert-dismissible fade show col-12" role="alert" id="successMessage">
                         User create successful!
                            <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert);
            $('.nav-tabs a[href="#adminTable"]').tab('show');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger d-flex align-items-center" role="alert" id="messageError">
                            ${body.info}
                        </div>`;
            addUserForm.prepend(alert);
        }
    });
}
