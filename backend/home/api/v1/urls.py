
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import SignupViewSet,AppOfficerViewSet,AppCitizenViewSet, LoginViewSet, HomePageViewSet, CustomTextViewSet

router = DefaultRouter()
router.register('signup', SignupViewSet, base_name='signup')
router.register('officer-signup', AppOfficerViewSet, base_name='signup')
router.register('citizen-signup', AppCitizenViewSet, base_name='signup')
router.register('login', LoginViewSet, base_name='login')
router.register('customtext', CustomTextViewSet)
router.register('homepage', HomePageViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
