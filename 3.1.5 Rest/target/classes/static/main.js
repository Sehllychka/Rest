$(async function () {
    await infoUser();
    await title();
    await getUser();
    await getUsers();
    await getDefaultModal();
    await create();
});
let roleList = [
    {id: 1, role: "ROLE_ADMIN"},
    {id: 2, role: "ROLE_USER"}
]
const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    findAllUsers: async () => await fetch('api/users'),
    findUserByUsername: async () => await fetch(`api/user`),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {
            method: 'DELETE',
            headers: userFetch.head
    }),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT',
        headers: userFetch.head,
        body: JSON.stringify(user)
    }),
    addNewUser: async (user) => await fetch('api/users', {
        method: 'POST',
        headers: userFetch.head,
        body: JSON.stringify(user)
    }),

};
//с ролью
async function infoUser() {
    let temp = '';
    const infoElement = document.querySelector('#info');
    const res = await userFetch.findUserByUsername();
    const user = await res.json();
    let rolesString = user.roles.map(e => " " + e.name.substr(5)).join(' ');
    temp += `
            <span style="color: white">
                ${user.username} with roles <span class="badge rounded-pill bg-primary">${rolesString}</span>
            </span>
        `;
    infoElement.innerHTML = temp;
    if (rolesString.includes("ADMIN")) {
        isUser = false;
    } else {
        isUser = true;
    }
}

//надпись на табл
async function title() {
    let temp = '';
    let newPageTitle;
    const titleElement = document.querySelector('#title');
    if (isUser) {
        temp = `<h1 class="h1 a1" id="title">User information page</h1>`;
        newPageTitle = "User page";
    } else {
        temp = `<h1 class="h1 a1" id="title">Admin panel</h1>`;
        newPageTitle = "Admin page";
    }
    titleElement.innerHTML = temp;
    document.title = newPageTitle;
}

//таблица юсер
async function getUser() {
    let temp = '';
    const tableElement = document.querySelector('#tableUser tbody');
    const res = await userFetch.findUserByUsername();
    const activeUserTable = isUser ? $("#userTable") : $("#adminTable");
    const activeUserTab = isUser ? $("#userTab") : $("#adminTab");

    const user = await res.json();
    temp = `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td> <span class="badge rounded-pill bg-warning text-dark">${user.roles.map(e => " " + e.name.substr(5)).join(' ')} </span></td>
        </tr>
    `;
    tableElement.innerHTML = temp;
    activeUserTable.addClass("show active");
    activeUserTab.addClass("show active");
}

//таблица админ
async function getUsers() {
    let temp = '';
    const tableElement = document.querySelector('#tableAllUsers tbody');
    const res = await userFetch.findAllUsers();
    const users = await res.json();
    users.forEach(user => {
        temp += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td><span class="badge rounded-pill bg-warning text-dark">${user.roles.map(e => " " + e.name.substr(5)).join(' ')} </span></td>
            <td>
                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-outline-primary"
                    data-toggle="modal" data-target="#editModal">Edit</button>
            </td>
            <td>
                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-outline-danger"
                    data-toggle="modal" data-target="#delete">Delete</button>
            </td>
        </tr>
       `;
    });
    tableElement.innerHTML = temp;

    $("#tableAllUsers").find('button').on('click', (event) => {
        let defaultModal = $('#defaultModal');
        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');
        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    });
}

// СКРЫТИЕ КНОПОК
$(document).ready(function () {
    $('#userTab').on('show.bs.tab', function (e) {
        $('.tabs').hide();
    });
    $('#adminTab').on('show.bs.tab', function (e) {
        $('.tabs').show();
    });
});
$(document).ready(function () {
    $('#userTab').on('show.bs.tab', function (e) {
        $('.tabs').hide();
    });
    $('#adminTab').on('show.bs.tab', function (e) {
        $('.tabs').show();
    });
});
async function getDefaultModal() {
    $('#defaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                edit(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}