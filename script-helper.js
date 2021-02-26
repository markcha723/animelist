const getLastSavedList = function() {
    const lastSaved = localStorage.getItem('listInUse')
    if (lastSaved !== null) {
        return JSON.parse(lastSaved)
    }
    else {
        return []
    }
}

// function to add items from above inputs
const addToList = function () {
    console.log(document.querySelector('#new-name').value)
    if (document.querySelector('#new-name').value.length > 1) {
        const newAnimeAddition = {
            name: document.querySelector('#new-name').value,
            rating: document.querySelector('#new-rating').value
        }
        animeList.push(newAnimeAddition)
        localStorage.setItem('listInUse', JSON.stringify(animeList))
        document.querySelector('#new-name').value = ''
        document.querySelector('#new-rating').value = ''
        document.querySelector('#addBoxes').style.display = 'none'
        document.querySelector('#add-item').style.display = 'block'
    }
    else {

    }
    renderList(animeList, filters)
}

//renders out the current list of anime
//updated 2-18-21 to include buttons for editing and deleting
const renderList = function (animelist, inputfilter) {
    let filteredList = animelist.filter(function(item) {
        return item.name.toLowerCase().includes(inputfilter.searchText.toLowerCase()) // using INCLUDES HERE and not == because you're trying to find which items HAVE it, not which items ARE the filter.
    })
    console.log(filteredList)

    document.querySelector('#anime-list').innerHTML = '' // actively clears the anime list each time an input is made so as to repopulate it.
    filteredList.forEach (function(item) {
        const itemToAdd = document.createElement('p')
        itemToAdd.textContent = `${item.name}, rating: ${item.rating}`
        document.querySelector('#anime-list').appendChild(itemToAdd)
        const deleteButton = document.createElement('button')
        deleteButton.className = "delbutton"
        deleteButton.id = `${item.name}`
        deleteButton.textContent = 'remove'
        document.querySelector('#anime-list').appendChild(deleteButton)
    })

}



// below are functions used for buttons
