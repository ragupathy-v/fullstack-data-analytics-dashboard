from django.urls import path
from .views import *

urlpatterns = [
    path('data-info/',DataInfo.as_view()),
    path('datacleaning/',DataCleaning.as_view()),
    path('viasualization/',Datavisualization.as_view()),
    path('downloaddataset/',DownloadDataset.as_view()),
]
