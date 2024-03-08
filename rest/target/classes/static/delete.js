async function deleteUser(modal, id) {
    const oneUser = await userFetch.findOneUser(id);
    const user = oneUser.json();
    modal.find('.modal-title').html('Delete user');
    const deleteButton = `<button  class="btn btn-outline-danger" id="deleteButton">Delete</button>`;
    const closeButton = `<button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>`;
    modal.find('.modal-footer').append(deleteButton);
    modal.find('.modal-footer').append(closeButton);
    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="deleteUser">
               <div class="form-group">
                    <label for="userId" class="col-form-label"><b>ID</b></label>
                    <input type="text" class="form-control username" id="userId" value="${user.id}" readonly>
               </div>                 
               <div class="form-group">
                    <label for="name" class="com-form-label"><b>First Name</b></label>
                    <input type="text" class="form-control" id="name" value="${user.name}" readonly>
                </div>
                <div class="form-group">
                    <label for="surname" class="com-form-label"><b>Lust Name</b></label>
                    <input type="text" class="form-control" id="surname" value="${user.lastname}" readonly>
                </div>
                <div class="form-group">
                    <label for="age" class="com-form-label"><b>Age</b></label>
                    <input type="number" class="form-control" id="age" value="${user.age}" readonly>
                </div>                
                <div class="form-group">
                    <label for="username" class="col-form-label"><b>Email</b></label>
                    <input type="text" class="form-control username" id="username" value="${user.email}" readonly>
               </div>
                 <div class="form-group">
                 <label for="roles" class="com-form-label"><b>Role</b></label>
                 <select id="roles" class="form-control select" size="2" name="roles" style="max-height: 100px" disabled>${roleList.map(role => {
            const isRole = user.roles.map((role => "" + role.name)).includes(role.role);
            return `<option value="${role.id}" ${isRole ? 'selected' : ''}>${role.role}</option>`;
        }).join('')}
                 </select>
                 </div>
                 </form>
`;
        modal.find('.modal-body').append(bodyForm);
    })
    $("#deleteButton").on('click', async () => {
        const response = await userFetch.deleteUser(id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger d-flex align-items-center" role="alert" id="messageError">
                            ${body.info}
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }

    })

}
