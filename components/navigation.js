/**
 - This function generates a dynamic navigation bar for a webpage. 
 - In each page with navigation there will be javascript code with puts this navigation inside the header tag.
 - It takes one argument, `active`, which represents the current page the user is on. 
 - Based on the value of `active`, the function highlights the navigation link.
 * @param {*} active Currently active page
 * @returns The navigation element
 */
export default function navigation(active) {
    return `
    <nav class="py-3 d-flex justify-content-between align-items-center position-fixed w-100">
        <a href="${active === 'blog-post' ? '../' : ''}index.html">
            <button class="d-flex gap-2 align-items-center rounded-3 p-1">
                <img class="rounded-pill" src="${active === 'blog-post' ? '..' : '.'}/media/profile-picture.png" alt="Miguel's profile picture" width="40">
                <p class="m-0">Miguel Brugge</p>
            </button>
        </a>    
        <ul class="list-unstyled d-flex gap-5 m-0">
            <li>
                <a class="${active === 'home' ? 'active' : ''}" href="${active === 'blog-post' ? '../' : ''}index.html">Home</a>
            </li>
            <li>
                <a class="${active === 'profile' ? 'active' : ''}" href="${active === 'blog-post' ? '../' : ''}profile.html">Profile</a>
            </li>
            <li>
                <a class="${active === 'dashboard' ? 'active' : ''}" href="${active === 'blog-post' ? '../' : ''}dashboard.html">Dashboard</a>
            </li>
            <li>
                <a class="${active === 'faq' ? 'active' : ''}" href="${active === 'blog-post' ? '../' : ''}faq.html">FAQ</a>
            </li>
            <li>
                <a class="${active === 'blog' || active === 'blog-post' ? 'active' : ''}" href="${active === 'blog-post' ? '../' : ''}blog.html">Blog</a>
            </li>
        </ul>
    </nav>
    `;
}