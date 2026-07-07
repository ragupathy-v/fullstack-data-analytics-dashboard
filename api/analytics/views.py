from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .Serializer import AnalyticsSerializer
from rest_framework import status
import pandas as pd
from .Services import Datasetinfo # Create your views here.
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import io
import os
import base64
from django.conf import settings
"""@api_view(['GET'])
def home(request):
    serializer=AnalyticsSerializer(data=request.data)
    if serializer.is_valid():
        print(serializer.validated_data['file'])
    return Response({'message': 'data analysis'})
"""


class DataInfo(APIView):
    
    def post(self,request):
        serializer=AnalyticsSerializer(data=request.data)
        
        if serializer.is_valid():
            data=serializer.validated_data['files']
            upload_dir=os.path.join(settings.MEDIA_ROOT,'uploads')
            os.makedirs(upload_dir,exist_ok=True)
            file_path=os.path.join(upload_dir,data.name)
            with open(file_path, "wb+") as destination:
                for chunk in data.chunks():
                    destination.write(chunk)

            df=pd.read_csv(file_path)
            analysedata=Datasetinfo(df)        
            return Response(data={'analysedata': analysedata, 'file_path': file_path},status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(data={'message': 'data analysis failed'},status=status.HTTP_400_BAD_REQUEST)
       
class DataCleaning(APIView):

    def post(self,request):

        file_path= request.data.get('file_path')
        method=request.data.get('method')
        df=pd.read_csv(file_path)
        print(len(df))

        if method=='dropduplicates':
            
            edf=df.drop_duplicates()
            print(len(df))
            edf.to_csv(file_path,index=False)
            edf=Datasetinfo(edf)
            return Response(data={'data':edf,'message':'duplicate rows deleted successfully'},status=status.HTTP_200_OK)
        
        elif method=='deletenullrows':
            edf=df.dropna()
            edf.to_csv(file_path,index=False)
            print(len(edf))
            edf=Datasetinfo(edf)
            return Response(data={'data':edf,'message':'nullrows are deleted'},status=status.HTTP_200_OK)
        elif method=='dropcolumn':
            colname=request.data.get('colname')
            if colname not in df.columns:
                return Response(data={'message':'column not found'}, status=status.HTTP_400_BAD_REQUEST)
            edf=df.drop(columns=[colname])
            edf.to_csv(file_path,index=False)
            edf=Datasetinfo(edf)
            return Response({'data':edf,'message':'colume deleted successfully'},status=status.HTTP_200_OK)
        

class Datavisualization(APIView):
    def post(self,request):
        chart=request.data.get('charttype')
        file_path=request.data.get('file_path')
        df=pd.read_csv(file_path)
        
        if chart=='Histogram':
            colname=request.data.get('colname')
            plt.figure(figsize=(12,6))
            plt.hist(df[colname].dropna(),edgecolor='black')
            plt.title(colname)
            plt.xlabel(colname)
            plt.ylabel("Frequency")
            plt.tight_layout()

            buffer=io.BytesIO()
            plt.savefig(buffer,format='png')
            plt.close()

            buffer.seek(0)
            image = base64.b64encode(buffer.getvalue()).decode()

            return Response(data={'image':image},status=status.HTTP_200_OK)
        
        elif chart=='BarChart':
            colname=request.data.get('colname')
            colname2=request.data.get('colname2')
            chartdata=df[[colname,colname2]].dropna()
            x=chartdata[colname]
            y=chartdata[colname2]
            plt.figure(figsize=(12,6))
            plt.bar(x,y)
            plt.xlabel(colname)
            plt.ylabel(colname2)
            plt.xticks(rotation=45, fontsize=8)
            plt.title(f"{colname2} vs {colname}")
            plt.tight_layout()
            
            
            buffer=io.BytesIO()
            plt.savefig(buffer,format='png')
            plt.close()

            buffer.seek(0)
            image = base64.b64encode(buffer.getvalue()).decode()

            return Response(data={'image':image},status=status.HTTP_200_OK)

            
        elif chart=='Piechart':
            colname=request.data.get('colname')
            counts=df[colname].value_counts()
            plt.pie(
            counts,
            labels=counts.index,
            autopct="%1.1f%%"
            )
            plt.title(colname)
            plt.tight_layout()
            
            buffer=io.BytesIO()
            plt.savefig(buffer,format='png')
            plt.close()

            buffer.seek(0)
            image = base64.b64encode(buffer.getvalue()).decode()

            return Response(data={'image':image},status=status.HTTP_200_OK)

        elif chart=='boxchart':
            return
        
from django.http import FileResponse

class DownloadDataset(APIView):
     
   def post(self,request):
        filepath=request.data.get('file_path')
        return FileResponse(
            open(filepath, "rb"),
            as_attachment=True,
            filename="cleaned_dataset.csv"
        )
        