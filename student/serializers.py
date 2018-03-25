from student.models import Course, CorseEnrollment
from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'course_name', 'course_desc','created_at')

def isUserExists(userName):

    """
    :param userName:
    :return: error
    :desc: check user exists or not
    """

    try:
        User.objects.get(username=userName)
        raise ValidationError("User already exist!")
    except User.DoesNotExist:
        pass

class SignUpSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=50, validators=[isUserExists])
    password_one = serializers.CharField(label='Password',max_length=20, min_length=8)
    password_two = serializers.CharField(label='Repeat-password',max_length=20, min_length=8)

    def validate(self, data):

        """
        :param data:
        :return: error message if password_one and password_two not same
        """
        if data['password_one'] != data['password_two']:
            raise serializers.ValidationError("Provided password didn't match with repeat password!")
        return data

class SignInSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20)

    def validate(self, data):
        user = authenticate(username = data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid user details!")
        return data

class EnrollmentSerializer(serializers.Serializer):

     course = serializers.CharField(max_length=50)

     def setData(self, userId):
         self.userId = userId


     def validate(self, data):
         try:
             CorseEnrollment.objects.get(course_id=data['course'], user_id=self.userId)
             raise serializers.ValidationError("Already enrolled for this course!")
         except CorseEnrollment.MultipleObjectsReturned:
             raise serializers.ValidationError("Already enrolled for this course!")
         except CorseEnrollment.DoesNotExist:
             enrollCount = CorseEnrollment.objects.filter(course_id=data['course']).count()
             if enrollCount >= 5:
                 raise serializers.ValidationError("Course filled with all required enrollments, Please try next time")

         return data


