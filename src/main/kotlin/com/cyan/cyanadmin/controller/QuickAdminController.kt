package com.cyan.cyanadmin.controller

import com.cyan.cyanadmin.quickadmin.QAdmin
import com.cyan.cyanadmin.quickadmin.QuickAdmin
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext
import org.springframework.context.ApplicationContext
import org.springframework.core.annotation.MergedAnnotations
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import javax.persistence.Id
import kotlin.streams.toList

class DataFieldInfo(var name: String, var type: String)
class DataInfo(var path: String, var entityName: String, var listFields: List<DataFieldInfo>, var idFieldName: String?)
class AdminResponse(var name: String, var restEndPoints: List<DataInfo>) {}

//fun inspectFieldAnotaion(field): {
//
//}
@RestController
class QuickAdminController @Autowired constructor(var applicationContext: ApplicationContext) {
//    @GetMapping("/quick-admin")
//    fun getRestEndPoints(): AdminResponse {
//        val beans: Map<String, Any> = applicationContext.getBeansWithAnnotation(RepositoryRestResource::class.java)
//        var listPath = beans.keys.stream().map(fun(name): DataInfo {
//            // ==================
//            // get rest data path
//            // ==================
//            var beanType = (applicationContext as AnnotationConfigServletWebServerApplicationContext).beanFactory.getType(name)
//            val annotation = MergedAnnotations.from(beanType!!, MergedAnnotations.SearchStrategy.TYPE_HIERARCHY).get(RepositoryRestResource::class.java)
//            val restDataPath = annotation.getValue("path").get().toString()
//            // =====================
//            // get entity field info
//            // =====================
//            val obj = applicationContext.getBean(name)
//            val genericInterfaces: Array<Type> = beanType.genericInterfaces
//            for (genericInterface in genericInterfaces) {
//                if (genericInterface is ParameterizedType) {
//                    val genericTypes: Array<Type> = (genericInterface as ParameterizedType).getActualTypeArguments()
//                    // :todo remove this stricky logic
//                    val type = genericTypes[0]
//                    val dataFieldInfoList = (type as Class<Any>).declaredFields.toList().stream().map { fi ->
//                        DataFieldInfo(fi.name, fi.type.name)
//                    }.toList()
//                    return DataInfo(restDataPath, type.name, dataFieldInfoList)
//                }
//            }
//            return DataInfo(restDataPath, "error", listOf<DataFieldInfo>())
//        }).toList()
//        return AdminResponse("quick admin panel meta data", listPath)
//    }

    @GetMapping("/quick-admin-meta")
    fun getRestEndPointsMeta(): AdminResponse {
        val beans: Map<String, Any> = applicationContext.getBeansWithAnnotation(QuickAdmin::class.java)
        var listPath = beans.keys.stream().map(fun(name): DataInfo {
            // ==================
            // get rest data path
            // ==================
            var bean: QAdmin = beans.get(name) as QAdmin
            var beanType = (applicationContext as AnnotationConfigServletWebServerApplicationContext).beanFactory.getType(name)
            val annotation = MergedAnnotations.from(beanType!!, MergedAnnotations.SearchStrategy.TYPE_HIERARCHY).get(QuickAdmin::class.java)
            val restDataPath = annotation.getValue("path").get().toString()
            val entityClass = annotation.getValue("entityClass").get().toString()
            val keyFiled = (annotation.getValue("entityClass").get() as Class<*>).declaredFields.find { fi ->
                fi.declaredAnnotations.find { ano -> ano.annotationClass == Id::class } != null
            }
            val dataFieldInfoList = (annotation.getValue("entityClass").get() as Class<*>).declaredFields
                    .filter { fi -> bean.field.map { fi -> fi.name }.toList().indexOf(fi.name) > -1 }
                    .map { fi ->
                        DataFieldInfo(fi.name, fi.type.name)
                    }.toList()
            return DataInfo(restDataPath, entityClass, dataFieldInfoList, keyFiled?.name)
        }).toList()
        return AdminResponse("quick admin panel meta data", listPath)
    }
}