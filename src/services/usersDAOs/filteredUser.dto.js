export default class FilteredUserDTO {

  constructor(user) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.age = user.age
    this.role = user.role
    this.documents = user.documents
    this.lastConecction = user.lastConecction
  }

}
