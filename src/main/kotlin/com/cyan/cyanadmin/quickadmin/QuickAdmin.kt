package com.cyan.cyanadmin.quickadmin

import java.lang.annotation.*
import java.lang.annotation.Retention
import kotlin.reflect.KClass

@Target(AnnotationTarget.ANNOTATION_CLASS, AnnotationTarget.CLASS)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
annotation class QuickAdmin (val entityClass: KClass<*>, val path: String)

open class QAdmin () {
    open lateinit var field : Array<QAdminField>
}
open class QAdminCustomType ()
class QAdminField (var name: String){
    var type: QAdminCustomType? = null
    constructor(name: String, customType: QAdminCustomType) : this(name) {
        type = customType
    }
}