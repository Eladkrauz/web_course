// Global variables
const header = document.querySelector('h1') // The header element to update the view title
const app = document.getElementById('app') // The main app container
const ddMenu = document.querySelector('#dropdown-menu') // The dropdown menu container
const sandwitch = document.querySelectorAll('svg') // The SVG elements used for the toggle button
const html = document.documentElement // The HTML root element for toggling dark mode
const menuContainer = document.getElementById('menu-container') // The main menu container
const darkLight = document.getElementById('darkLight') // The dark/light mode toggle container

// Function to toggle dark mode
const toggleTheme = () => html.classList.toggle('dark')

// Function to set the current view based on the button clicked
const setView = (v) => {
    header.innerText = v // Update the header text
    toggleMenu(true) // Hide the menu

    // Render the appropriate view
    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

// Function to toggle the dropdown menu visibility
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden') // Toggle hidden class on the dropdown menu
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden') // Toggle hidden class on all SVG elements
        })
    } else {
        ddMenu.classList.add('hidden') // Add hidden class to the dropdown menu
        document.querySelectorAll('svg')[0].classList.remove('hidden') // Show the first SVG element
        document.querySelectorAll('svg')[1].classList.add('hidden') // Hide the second SVG element
    }
}

// Function to add a row of buttons to the container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>` // Create a row of buttons
    container.insertAdjacentHTML('beforeend', row) // Insert the row into the container
}

// Function to add a monitor to the calculator view
const addMonitor = (container, text) => {
    const t = text ?? '' // Default text if none provided
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 dark:bg-stone-700 dark:text-white dark:border-black h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor) // Insert the monitor into the container
}

// Function to create a button HTML string
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '' // Additional class for the calculate button
    return `<div class='bg-blue-400 hover:bg-blue-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-slate-500 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}

// Function to add buttons to the calculator view
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('') // Generate HTML for all buttons
    addRow(container, btnHTML) // Add the buttons to the container
}

// Function to handle button clicks in the calculator view
const click = (event) => {
    const monitor = document.getElementById('monitor') // Get the monitor element
    const bac = monitor.innerText.trim() // Get the current text in the monitor
    const a = event.target.innerText // Get the text of the clicked button
    console.log(a) // Log the clicked button text
    if (a === 'clear') {
        monitor.innerText = '' // Clear the monitor text
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac) // Evaluate the expression and show the result
    } else {
        monitor.innerText += a // Append the clicked button text to the monitor
    }
}

// Function to render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'] // Calculator buttons
    app.innerHTML = '' // Clear the app container
    addMonitor(app) // Add the monitor
    addButtons(app, labels) // Add the buttons
    const buttons = document.querySelectorAll('.d-btn') // Get all button elements
    buttons.forEach((el) => el.addEventListener('click', click)) // Add click event listeners to buttons
}

// Function to render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>' // Placeholder content for About view
}

// Function to render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>' // Placeholder content for Contact view
}

// Function to render the menu
const renderMenu = () => {
    // Define the menu items with their names and corresponding views
    const menuItems = [
        { name: 'Calculator', view: 'Calculator' },
        { name: 'About', view: 'About' },
        { name: 'Contact', view: 'Contact' },
    ]
    
    // Create the HTML for the main menu items, visible on larger screens (hidden on small screens)
    const menuHTML = menuItems.map(item => 
        `<button class="hidden sm:block" onclick="setView('${item.view}')">${item.name}</button>`
    ).join('')

    // Create the HTML for the dropdown menu items, visible on small screens
    const dropdownMenuHTML = menuItems.map(item => 
        `<button class="block py-1 px-2" onclick="setView('${item.view}')">${item.name}</button>`
    ).join('')

    // Inject the generated HTML into the respective containers
    menuContainer.innerHTML = menuHTML
    ddMenu.innerHTML = dropdownMenuHTML

    // Add the toggle button for small screens
    const toggleButtonHTML = `
        <button class="block sm:hidden" onclick="toggleMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                <path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
            <svg class="hidden" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
                <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </button>`
    // Insert the toggle button at the beginning of the menu container
    menuContainer.insertAdjacentHTML('afterbegin', toggleButtonHTML)
}

// Function to render the dark/light mode toggle buttons
const renderThemeToggle = () => {
    const darkHTML = `<button class="dark:hidden block" onclick="toggleTheme()">Dark</button>
    <button class="hidden dark:block" onclick="toggleTheme()">Light</button>`

    darkLight.innerHTML = darkHTML
}

// Initial rendering of the menu, theme toggle, and calculator
renderMenu()
renderThemeToggle()
renderCalculator()