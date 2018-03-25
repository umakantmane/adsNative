from django.shortcuts import render,Http404
from student.models import Course,CorseEnrollment
from student.serializers import CourseSerializer, EnrollmentSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

#test
class CourseList(APIView):

    def get(self, request):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        course = CourseSerializer(course)
        return Response(course.data)

    def put(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        course = Course.objects.get(pk=pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EnrollmentList(APIView):

    def get(self, request):
        enroll = CorseEnrollment.objects.all()
        data = []
        for i in enroll:
            data.append({
                'id':i.id,
                'student_name':i.user.username,
                'course_name':i.course.course_name
            })
        return JsonResponse({'data':data})

    def post(self, request):

        serializer = EnrollmentSerializer(data=request.data)
        serializer.setData(request.query_params['user_id'])
        if serializer.is_valid():
            enroll = CorseEnrollment()
            enroll.user_id = request.query_params['user_id']
            enroll.course_id = serializer.data['course']
            enroll.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnrollmentDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    def get_object(self, pk):
        try:
            return CorseEnrollment.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        enroll = self.get_object(pk)
        enroll = EnrollmentSerializer(enroll)
        return Response(enroll.data)

    def put(self, request, pk, format=None):
        enroll = self.get_object(pk)
        serializer = EnrollmentSerializer(enroll, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        enroll = CorseEnrollment.objects.get(pk=pk)
        enroll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StudentEnroll(APIView):

    def get(self, request, user_id):
        data = []
        enroll = CorseEnrollment.objects.filter(user_id=user_id)
        for i in enroll:
            data.append({
                'id': i.id,
                'student_name': i.user.username,
                'course_name': i.course.course_name
            })
        return JsonResponse({'data': data})

class StudentEnrollDetails(APIView):

    def delete(self, request, pk, format=None):
        courseEnroll = CorseEnrollment.objects.get(pk=pk)
        courseEnroll.delete()
        return JsonResponse({'message':'success'})
