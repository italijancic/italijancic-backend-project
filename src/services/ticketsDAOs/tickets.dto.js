export default class TicketDTO {

  constructor(ticket) {
    this.id = ticket._id || ticket.id
    this.code = ticket.code
    this.purchaseDateTime = ticket.purchaseDateTime
    this.amount = ticket.amount
    this.purchaser = ticket.purchaser
    this.deleted = ticket.deleted
    this.createdAt = ticket.createdAt
    this.updatedAt = ticket.updatedAt
  }

}