const cardList = [
  {
    title: 'Kitten 1',
    image:
      'https://img.freepik.com/free-photo/portrait-beautiful-purebred-pussycat-with-shorthair-orange-collar-neck-sitting-floor-reacting-camera-flash-scared-looking-light-indoor_8353-12551.jpg?semt=ais_hybrid&w=740&q=80',
    link: 'About Kitten 2',
    desciption: 'Cute kitten 2'
  },
  {
    title: 'Kitten 2',
    image:
      'https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww',
    link: 'About Kitten 2',
    desciption: 'Cute kitten 2'
  },
  {
    title: 'Kitten 3',
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
