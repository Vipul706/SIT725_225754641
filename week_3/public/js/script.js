const cardList = [
  {
    title: 'Kitten 2',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    link: 'About Kitten 2',
    desciption: 'Cute kitten 2'
  },
  {
    title: 'Kitten 2',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    link: 'About Kitten 2',
    desciption: 'Cute kitten 2'
  },
  {
    title: 'Kitten 2',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    link: 'About Kitten 2',
    desciption: 'Cute kitten 2'
  }
]

const submitForm = () => {
  let formData = {}

  formData.first_name = $('#first_name').val()
  formData.last_name = $('#last_name').val()
  formData.email = $('#email').val()

  console.log('Form Data:', formData)
}

const addCards = items => {
  items.forEach(item => {
    let html =
      '<div class="col s4">' +
      '<div class="card">' +
      '<div class="card-image">' +
      '<img src="' +
      item.image +
      '">' +
      '</div>' +
      '<div class="card-content">' +
      '<span class="card-title">' +
      item.title +
      '</span>' +
      '<p>' +
      item.desciption +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>'

    $('#card-section').append(html)
  })
}

$(document).ready(function () {
  $('.materialboxed').materialbox()

  $('.modal').modal()

  $('#formSubmit').click(() => {
    submitForm()
  })

  addCards(cardList)
})
