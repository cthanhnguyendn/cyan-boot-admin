package com.cyan.cyanadmin

import de.codecentric.boot.admin.server.config.EnableAdminServer
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableAdminServer
class CyansystemApplication

fun main(args: Array<String>) {
	runApplication<CyansystemApplication>(*args)
}
