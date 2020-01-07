export const fetchMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    .then(res => {
      if (!res.ok) {
        throw Error('Fetching movies failed')
      }
      return res.json()
    })
}


export const fetchUser = (options) => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', options)
    .then(res => {
      if (!res.ok) {
        throw Error('Incorrect Username/Password')
      }
      return res.json()
    })
}

export const fetchRatings = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${id}/ratings`)
    .then(res => {
      if (!res.ok) {
        throw Error('Invalid User ID')
      }
      return res.json()
    })
}

export const postUserRating = (options, userId) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`, options)
    .then(res => {
      if (!res.ok) {
      throw Error('Failure to POST User Rating')
    }
    return res.json()
  })
}

export const deleteApiRating = (options, movieRating) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${movieRating.user_id}/ratings/${movieRating.id}`, options)
    .then(res => {
      if (!res.ok) {
        throw Error('Failure to DELETE User Rating')
      }
      return res
    })
}