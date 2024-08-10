export const headerLinks = [
    {
      label: 'Početna',
      route: '/',
    },
    {
      label: 'Napravi događaj',
      route: '/events/create',
    },
    {
      label: 'Moj profil',
      route: '/profile',
    },
  ]
  
export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}

export const Colors = {
  blueDark: '#395E6F',
  blueLight: '#42C1BA'
}