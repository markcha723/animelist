let animeList = getLastSavedList()

const filters = {
    searchText: ""
}

const sampleList = [
    {name: "Neon Genesis Evangelion", rating: 9},
    {name: "Your Lie in April", rating: 7},
    {name: "Nodame Cantabile", rating: 8},
    {name: "Wonder Egg Priority", rating: undefined},
    {name: "Fullmetal Alchemist: Brotherhood", rating: 10},
    {name: "Fractale", rating: 4}
]

// uses a sample list instead of from local storage
document.querySelector('#use-sample-list').addEventListener('change', function (e) {
    const listInUse = localStorage.getItem('userList')
    if (e.target.checked) {
        console.log('This worked')
        localStorage.setItem('tempList', JSON.stringify(JSON.parse(localStorage.getItem('listInUse'))))
        localStorage.setItem('listInUse', JSON.stringify(sampleList))
    }
    else {
        localStorage.setItem('listInUse', JSON.stringify(JSON.parse(localStorage.getItem('tempList'))))
        localStorage.setItem('tempList', '')
    }
    animeList = getLastSavedList()
    renderList(animeList, filters)
})

// button to show for inputs for new addition
document.querySelector('#addBoxes').style.display = 'none'
document.querySelector('#add-item').addEventListener('click', function () {
    document.querySelector('#addBoxes').style.display = 'block'
    document.querySelector('#add-item').style.display = 'none'
})

// button to hide inputs for new addition upon new addition
document.querySelector('#confirmAdd').addEventListener('click', function () {
    addToList()
})


// searches and displays any relevant titles
document.querySelector('#search-item').addEventListener("input", function(e) {
    filters.searchText = e.target.value
    console.log(filters.searchText)
    renderList(animeList, filters)
})

//alphabetically sorts items in the list
document.querySelector('#alphorg').addEventListener('click', function() {
    animeList = getLastSavedList()
    animeList.sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } 
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0
    })
    renderList(animeList, filters)
})

//sorts items in the list by rating
document.querySelector('#num-org').addEventListener('click', function() {
    animeList.sort(function(a, b) {
        if (a.rating < b.rating) {
            return -1;
        } 
        if (a.rating > b.rating) {
            return 1;
        }
        return 0
    })
    renderList(animeList, filters)
})



// deletes item upon clicking delete button, updates the list
document.querySelector('#anime-list').addEventListener('click', function (e) {
    const indexToBeRemoved = animeList.findIndex(function(item) {
        if (item.name === e.target.id) {
            return true
        }
    })
    console.log(indexToBeRemoved)
    console.log(animeList[indexToBeRemoved])
    if (indexToBeRemoved > -1) {
        animeList.splice(indexToBeRemoved, 1)
        localStorage.setItem('listInUse', JSON.stringify(animeList))
        renderList(animeList, filters)
    }
    else {
    }
})

// below is simply what happens when the page loads.

renderList(animeList, filters)


