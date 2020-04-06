package com.cyan.cyanadmin

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Merchant(var name: String, var logo: String, var domain: String, @Id @GeneratedValue var id: Long? = null)

@Entity
class User(var user_name: String, var email: String, @Id @GeneratedValue var id: Long)