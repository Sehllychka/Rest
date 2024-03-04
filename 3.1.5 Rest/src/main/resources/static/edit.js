
async function edit(modal, id) {
    const oneUser = await userFetch.findOneUser(id);
    const user = oneUser.json();
    modal.find('.modal-title').html('Edit user');
    const editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    const closeButton = `<button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>`;
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);
    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label for="id" class="col-form-label"><b>ID</b></label>
                    <input type="text" class="form-control username" id="id" value="${user.id}" readonly>
               </div>
                <div class="form-group">
                    <label for="name" class="com-form-label"><b>First Name</b></label>
                    <input type="text" class="form-control" id="name" value="${user.name}">
                </div>
                <div class="form-group">
                    <label for="lastname" class="com-form-label"><b>Last Name</b></label>
                    <input type="text" class="form-control" id="lastname" value="${user.lastname}">
                </div>
                <div class="form-group">
                    <label for="age" class="com-form-label"><b>Age</b></label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>                
                <div class="form-group">
                    <label for="email" class="col-form-label"><b>Email</b></label>
                    <input type="email" class="form-control username" id="email" value="${user.email}">
               </div>
                <div class="form-group">
                    <label for="password" class="com-form-label"><b>Paswword</b></label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>                
                <div class="form-group">
                <label for="roles" class="com-form-label"><b>Role</b></label>
                <select id="roles" class="form-control select" size="2" name="roles" style="max-height: 100px">${roleList.map(role => {
                    const isRole = user.roles.map((role => "" + role.name)).includes(role.role);
                    return `<option value="${role.id}" ${isRole ? 'selected' : ''}>${role.role}</option>`;
                }).join('')}
                </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
        let rolesSelect = document.getElementById('roles');
        user.roles.forEach(role => {
            let option = rolesSelect.querySelector(`[value="${role.role}"]`);
            if (option) {
                option.selected = true;
            }
        });
    })
    $("#editButton").on('click', async () => {
        $('.alert').remove();
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#roles').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let id = modal.find("#id").val().trim();
        let name = modal.find("#name").val().trim();
        let lastname = modal.find("#lastname").val().trim();
        let age = modal.find("#age").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim();
        let data = {
            id: id,
            name: name,
            lastname: lastname,
            age: age,
            email: email,
            password: password,
            roles: checkedRoles()

        }
        const response = await userFetch.updateUser(data, id);
        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info} 
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}
