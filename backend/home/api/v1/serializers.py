
from allauth.utils import generate_unique_username
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.files.base import ContentFile
import base64
import six
import uuid
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


def decode_based64_file(data):

    def get_file_extension(file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

    # Check if this is a base64 string
    if isinstance(data, six.string_types):
        # Check if the base64 string is in the "data:" format
        if 'data:' in data and ';base64,' in data:
            # Break out the header from the base64 content
            header, data = data.split(';base64,')

        # Try to decode the file. Return validation error if it fails.
        try:
            decoded_file = base64.b64decode(data)
        except TypeError:
            TypeError('invalid_image')

        # Generate file name:
        file_name = str(uuid.uuid4())[:20] # 12 characters are more than enough.
        # Get the file name extension:
        file_extension = get_file_extension(file_name, decoded_file)

        complete_file_name = "%s.%s" % (file_name, file_extension, )

        return ContentFile(decoded_file, name=complete_file_name)

class AppOfficerSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(write_only=True,max_length=100)
    last_name = serializers.CharField(write_only=True,max_length=100)
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    username = serializers.CharField(max_length=100, required=False)
    success_message = serializers.CharField(required=False)
    success = serializers.BooleanField(required=False)
    officer_batch_no = serializers.CharField(write_only=True,max_length=50)
    phone_no = serializers.CharField(write_only=True,max_length=50)
    officer_department = serializers.CharField(write_only=True,max_length=100)
    profile_image = serializers.CharField(write_only=True, required=False)

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
        #print(decode_based64_file(validated_data.get('profile_image')))
        #ROLE=2 FOR OFFICE AND 1 FOR CITIZEN
        UserProfile.objects.create(
           user=user,
           officer_department=validated_data.get('officer_department'),
           role=2,
           officer_batch_no=validated_data.get('officer_batch_no'),
           profile_image=decode_based64_file(validated_data.get('profile_image')),
        )
        validated_data['success'] = True
        return validated_data
  
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
          raise serializers.ValidationError('username already exists.') 

        return value

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
    licence_photo = serializers.ImageField(write_only=True)
    profile_image = serializers.ImageField(write_only=True)
    success_message = serializers.CharField(required=False)
    success = serializers.BooleanField(required=False)

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
           licence_photo=validated_data.get('licence_photo'),
           profile_image=validated_data.get('profile_image'),
        )  

        validated_data['success'] = True
        return validated_data
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
          raise serializers.ValidationError('username already exists.') 

        return value

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
