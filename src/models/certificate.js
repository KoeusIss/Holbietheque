export default class Certificate {
  constructor(
    name= '',
    authority= '',
    is_expire= false,
    issued_at= Date.now().toString(),
    expired_at= Date.now().toString(),
    certificate_id= '',
    description= ''
  ) {
    this.name = name
    this.authority = authority
    this.is_expire = is_expire
    this.issued_at = issued_at
    this.expired_at = expired_at
    this.certificat_id = certificate_id
    this.description = description
  }
}