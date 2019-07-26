from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from home.models import UserProfile
from django.contrib.auth.models import User

# Register your models here.

from .models import UserProfile

class ProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'UserProfile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, )
    list_display = ['username', 'first_name', 'last_name', 'role' ,'approved_user']

    def role(self, obj):
        try:
            role = UserProfile.objects.get(user=obj).role #Or change this to how you would access the userprofile object - This was assuming that the User, Profile relationship is OneToOne
            if(role == 1):
              return "Citizen"
            else:
              return "Officer"
        except:
            return "-"

    def approved_user(self, obj):
        try:
            approved_user = UserProfile.objects.get(user=obj).approved_user #Or change this to how you would access the userprofile object - This was assuming that the User, Profile relationship is OneToOne
            if(approved_user == 1):
              return "APPROVED"
            else:
              return "NOT APPROVED"
            
            return "NOT APPROVED"
        except:
            return "-"

    approved_user.role = 'Role'
    approved_user.short_description = 'Approved User'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)