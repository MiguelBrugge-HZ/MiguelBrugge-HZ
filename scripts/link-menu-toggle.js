const linkButton = document.getElementById('link-button');
const linkMenu = document.getElementById('link-menu');
function openSideMenu() {
    let isHidden = linkMenu.classList.contains('d-none');
    if (isHidden) {
        linkMenu.classList.remove('d-none');
        linkMenu.classList.add('d-block');
        linkButton.innerText = "Close links";

        linkButton.classList.add('button');
        linkButton.classList.remove('ghost-button');
    } else {
        linkMenu.classList.remove('d-block');
        linkMenu.classList.add('d-none');
        linkButton.innerText = "Open links";

        linkButton.classList.add('ghost-button');
        linkButton.classList.remove('button');
    }
}