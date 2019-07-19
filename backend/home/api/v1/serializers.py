
from allauth.utils import generate_unique_username
from django.contrib.auth.models import User
from rest_framework import serializers

from home.models import CustomText, HomePage,UserProfile


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True
            }
        }

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=generate_unique_username([
                validated_data.get('first_name'), validated_data.get('last_name'),
                validated_data.get('email'), 'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError('This field is required.')
        return value

class AppOfficerSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    username = serializers.CharField(max_length=100, required=False)
    officer_batch_no = serializers.CharField(max_length=50)
    officer_department = serializers.CharField(max_length=100)
    profile_image = serializers.CharField(max_length=100)

    def create(self, validated_data):
        if validated_data.get('username') is None:
          validated_data['username'] = generate_unique_username([
                validated_data.get('first_name'), validated_data.get('last_name'),
                validated_data.get('email'), 'user'
            ])
            
        user = User(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=validated_data.get('username')
        )
        
        user.set_password(validated_data.get('password'))
        user.save()
        
        #ROLE=2 FOR OFFICE AND 1 FOR CITIZEN
        UserProfile.objects.create(
           user=user,
           officer_department=validated_data.get('officer_department'),
           role=2,
           officer_batch_no=validated_data.get('officer_batch_no'),
           profile_image=validated_data.get('profile_image'),
        )

        return validated_data

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError('This field is required.')
        return value

class AppCitizenSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    username = serializers.CharField(max_length=100, required=False)
    birthdate = serializers.DateField()
    height = serializers.DecimalField(max_digits=5,decimal_places=2,default=0)
    weight = serializers.DecimalField(max_digits=5,decimal_places=2,default=0)
    street_address = serializers.CharField(max_length=200)
    state = serializers.CharField(max_length=100)
    city = serializers.CharField(max_length=100)
    zip_code = serializers.CharField(max_length=100)
    city = serializers.CharField(max_length=100)
    driver_licence_no = serializers.CharField(max_length=50)
    licence_photo = serializers.CharField(max_length=100)
    profile_image = serializers.CharField(max_length=100)

    def create(self, validated_data):
        if validated_data.get('username') is None:
          validated_data['username'] = generate_unique_username([
                validated_data.get('first_name'), validated_data.get('last_name'),
                validated_data.get('email'), 'user'
            ])

        user = User(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=validated_data.get('username')
        )
        
        user.set_password(validated_data.get('password'))
        user.save()
        
        #user_profiles = UserProfile.objects.filter(user=user)
        #print(user_profiles)
        #profile = user_profiles[0]
        #ROLE=2 FOR OFFICE AND 1 FOR CITIZEN
        UserProfile.objects.create(
           user=user,
           role=1,
           birthdate=validated_data.get('birthdate'),
           height=validated_data.get('height'),
           weight=validated_data.get('weight'),
           street_address=validated_data.get('street_address'),
           zip_code=validated_data.get('zip_code'),
           state=validated_data.get('state'),
           city=validated_data.get('city'),
           driver_licence_no=validated_data.get('driver_licence_no'),
           licence_photo=validated_data.get('driver_licence_no'),
           profile_image=validated_data.get('profile_image'),
        )  

        return validated_data

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError('This field is required.')
        return value

class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = '__all__'


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = '__all__'
