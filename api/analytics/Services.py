
import pandas as pd
import numpy as np
def Datasetinfo(data):
    
    return {'NumberofRows':len(data),
            'NameofColumns':data.columns.tolist(),
            'Numberofnull':data.isna().sum().to_dict(),
            'NumberofDuplicateRows':data.duplicated().sum(),
            'DatatypeofColumns':data.dtypes.astype(str).to_dict(),
            'ShapeofDataset':data.shape,
            'missrow':data[data.isna().any(axis=1)].replace({np.nan:None,pd.NA:None}).to_dict(orient='records')
            }
