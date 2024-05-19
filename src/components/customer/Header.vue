<template>
    <header class="header">
        <div class="container">
            <div class="logo">
                <a href="#"><img src="../../assets/logo.svg" alt="Hirizon Supermarket"></a>
            </div>
            <nav class="nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Offers</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </nav>
            <div class="contact-info">
                <p>Call Us: <a href="tel:+123456789">+123 456 789</a></p>
                <p>Email: <a href="mailto:info@hirizon.com">info@hirizon.com</a></p>
            </div>
        </div>
    </header>
</template>

<style scoped>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
}

.header {
    background-color: #4CAF50;
    color: white;
    padding: 10px 0;
    box-shadow: 0 4px 2px -2px gray;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo img {
    height: 50px;
}

.nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.nav ul li {
    margin-left: 20px;
}

.nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s;
}

.nav ul li a:hover {
    color: #ddd;
}

.contact-info {
    text-align: right;
}

.contact-info p {
    margin: 0;
}

.contact-info a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.contact-info a:hover {
    color: #ddd;
}
</style>