let cookieFlavors;
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown');
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.text = 'Select a flavor';
    dropdown.appendChild(emptyOption);
    fetch('http://localhost:3000/CookieFlavors')
        .then(res => res.json())
        .then(data => {
            cookieFlavors = data;
            cookieFlavors.forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.text = item.name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


function renderCookies(event){
    event.preventDefault()
    const selectedFlavor = event.target[0].value;
    const selectedCookie = cookieFlavors.find(cookie => cookie.name === selectedFlavor);
    if (selectedCookie) {
        let card = document.createElement('div');
        card.innerHTML = `
            <div>
                <h2>${selectedCookie.name}</h2>
                <h3> Score: ${event.target.ranking.value}</h3>
                <img src="${selectedCookie.image}" class="cookie-image" id="${selectedCookie.id}"/>
            </div>
        `;
        document.querySelector('#cookie-container').appendChild(card);
        let btn = document.createElement('button');
        btn.addEventListener('click', removeCookie)
        btn.textContent = 'Delete'
        btn.classList = "remove-cookie"
        card.appendChild(btn);
        const cookieImage = card.querySelector('.cookie-image')
        cookieImage.addEventListener('mouseover', showDescription)

    }

}

let form = document.querySelector("#form")
form.addEventListener('submit', renderCookies)

function removeCookie(e){
    e.target.parentNode.remove()
}



function showDescription(event){
    alert(cookieFlavors.find(f => event.target.id == f.id).description)
}








    



