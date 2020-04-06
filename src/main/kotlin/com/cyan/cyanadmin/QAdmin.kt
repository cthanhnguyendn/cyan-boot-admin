package com.cyan.cyanadmin

import com.cyan.cyanadmin.quickadmin.QAdmin
import com.cyan.cyanadmin.quickadmin.QAdminField
import com.cyan.cyanadmin.quickadmin.QuickAdmin
import org.springframework.stereotype.Component

class ImageQAminType(var url: String)

@QuickAdmin(entityClass = User::class, path = "user")
@Component
class QAdminMerchant: QAdmin(){
    override var field: Array<QAdminField> = arrayOf(
            QAdminField("user_name"),
            QAdminField("email")
    )
}