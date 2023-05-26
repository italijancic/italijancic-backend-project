import factory from '../services/factory.js'


export const checkRequiredFiles = async (uid) => {

  try {
    const user = await factory.users.getUserById(uid)

    if ( user.status != 'files loaded' ) throw new Error('User did not load files')

    if ( !user.documents.find((document) => document.name.includes('id') )) throw new Error('Identification not loaded')
    if ( !user.documents.find((document) => document.name.includes('AddressValidation') )) throw new Error('Address validation not loaded')
    if ( !user.documents.find((document) => document.name.includes('AccountValidation') )) throw new Error('Acount state validation not loaded')

    return true

  } catch (error) {
    throw new Error(error.message)
  }
}