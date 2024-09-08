export default function navigation(active) {
    return `
    <nav class="py-3 d-flex justify-content-between align-items-center position-fixed w-100">
        <a href="/">
            <button class="d-flex gap-2 align-items-center rounded-3 p-1">
                <img class="rounded-pill" src="/media/profile-picture.png" alt="Profile picture" width="40">
                <p class="m-0">Miguel Brugge</p>
            </button>
        </a>    
        <ul class="list-unstyled d-flex gap-5 m-0">
            <li>
                <a class="${active === 'home' ? 'active' : ''}" href="/">Home</a>
            </li>
            <li>
                <a class="${active === 'profile' ? 'active' : ''}" href="/pages/profile.html">Profile</a>
            </li>
            <li>
                <a class="${active === 'dashboard' ? 'active' : ''}" href="/pages/dashboard.html">Dashboard</a>
            </li>
            <li>
                <a class="${active === 'faq' ? 'active' : ''}" href="/pages/faq.html">FAQ</a>
            </li>
            <li>
                <a class="${active === 'blog' ? 'active' : ''}" href="/pages/blog.html">Blog</a>
            </li>
        </ul>
    </nav>
    `;
}