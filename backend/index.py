import json

from flask import Flask, request
from flask_cors import CORS, cross_origin
from datetime import date
import pandas as pd
from sklearn.linear_model import Ridge
import numpy as np
from sklearn.ensemble import RandomForestRegressor


app = Flask(__name__)
CORS(app)

ridge_model = Ridge()
model=RandomForestRegressor(n_estimators=100,max_features=3, random_state=1)


@app.route('/api/dashboard/bmkg', methods=['GET'])
def run_program():
    dataset_BMKG = pd.read_csv("bmkg.csv")
    dataset_BMKG.head(72)

    return app.response_class(json.dumps(json.loads(dataset_BMKG.to_json()), indent=1), content_type='application/json')

@app.route('/api/dashboard/dbd', methods=['GET'])
def get_dbd():
    dataset_DBD = pd.read_csv("dbd.csv")
    dataset_DBD.head()
    dataset_DBD.index.freq = 'MS'
    df=pd.DataFrame()
    df.tail()
    dbd_results = dataset_DBD.drop(columns=['KotaAdministrasi','Kecamatan','JumlahMeninggalDBD'])

    return app.response_class(json.dumps(json.loads(dbd_results.to_json()), indent=1), content_type='application/json')

@app.route('/api/ridge/dbd', methods=['GET'])
def getRidge_DBD():
    dataset_DBD = pd.read_csv("dbd.csv")
    dataset_DBD.head()
    dataset_DBD.index.freq = 'MS'
    df=pd.DataFrame()
    df.tail()
    dbd_results = dataset_DBD.drop(columns=['KotaAdministrasi','Kecamatan','JumlahMeninggalDBD'])

    dbd_results=dbd_results.dropna()
    
    dbd_results['1b']=dbd_results['PenderitaDBD'].shift(+1)
    dbd_results['2b']=dbd_results['PenderitaDBD'].shift(+2)
    dbd_results['3b']=dbd_results['PenderitaDBD'].shift(+3)


    x1,x2,x3,y=dbd_results['1b'],dbd_results['2b'],dbd_results['3b'],dbd_results['PenderitaDBD']
    x1,x2,x3,y=np.array(x1),np.array(x2),np.array(x3),np.array(y)
    x1,x2,x3,y=x1.reshape(-1,1),x2.reshape(-1,1),x3.reshape(-1,1),y.reshape(-1,1)
    final_x=np.concatenate((x1,x2,x3),axis=1)
    where_are_NaNs = np.isnan(final_x)
    final_x[where_are_NaNs] = 0

    X_train,X_test,y_train,y_test=final_x[:-30],final_x[-30:],y[:-30],y[-30:]
    model.fit(X_train,y_train)
    ridge_model.fit(X_train,y_train)
    pred = model.predict(X_test)

    return app.response_class(json.dumps([
        {
            "label": "Ridge_Predictions",
            "data": pred.tolist(),
        },
        {
            "label": "RR",
            "data": y_test.tolist(),
        }
    ], indent=1), content_type='application/json')

@app.route('/api/ridge/bmkg', methods=['GET'])
def getRidge_BMKG():
    dataset_BMKG = pd.read_csv("bmkg.csv")
    dataset_BMKG.head(72)

    rr_data = dataset_BMKG.drop(columns=['Tn','Tx','Tavg','RH_avg','ss'])

    rr_data['1b']=rr_data['RR'].shift(+1)
    rr_data['2b']=rr_data['RR'].shift(+2)
    rr_data['3b']=rr_data['RR'].shift(+3)

    rr_data=rr_data.dropna()

    x1,x2,x3,y=rr_data['1b'],rr_data['2b'],rr_data['3b'],rr_data['RR']
    x1,x2,x3,y=np.array(x1),np.array(x2),np.array(x3),np.array(y)
    x1,x2,x3,y=x1.reshape(-1,1),x2.reshape(-1,1),x3.reshape(-1,1),y.reshape(-1,1)
    final_x=np.concatenate((x1,x2,x3),axis=1)
    where_are_NaNs = np.isnan(final_x)
    final_x[where_are_NaNs] = 0

    X_train,X_test,y_train,y_test=final_x[:-30],final_x[-30:],y[:-30],y[-30:]

    model.fit(X_train,y_train)
    ridge_model.fit(X_train,y_train)

    pred_ridge=ridge_model.predict(X_test)

    return app.response_class(json.dumps([
        {
            "label": "Ridge_Predictions",
            "data": pred_ridge.tolist(),
        },
        {
            "label": "RR",
            "data": y_test.tolist(),
        }
    ], indent=1), content_type='application/json')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=4000)


# ridge_model = Ridge()
# model=RandomForestRegressor(n_estimators=100,max_features=3, random_state=1)
# tx_data = dataset_BMKG.drop(columns=['Tn','Tavg','RH_avg','RR','ss'])

# df = pd.read_csv("pasien.csv")
# df.index.freq = 'MS'
# df.tail()

# tx_data['1b']=tx_data['Tx'].shift(+1)
# tx_data['2b']=tx_data['Tx'].shift(+2)
# tx_data['3b']=tx_data['Tx'].shift(+3)

# tx_data = tx_data.dropna()

# x1,x2,x3,y=tx_data['1b'],tx_data['2b'],tx_data['3b'],tx_data['Tx']
# x1,x2,x3,y=np.array(x1),np.array(x2),np.array(x3),np.array(y)
# x1,x2,x3,y=x1.reshape(-1,1),x2.reshape(-1,1),x3.reshape(-1,1),y.reshape(-1,1)
# final_x=np.concatenate((x1,x2,x3),axis=1)

# X_train,X_test,y_train,y_test=final_x[:-30],final_x[-30:],y[:-30],y[-30:]

# model.fit(X_train, y_train)
# ridge_model.fit(X_train,y_train)

# pred=model.predict(X_test).tolist()
# lin_pred=ridge_model.predict(X_test).tolist()

# return app.response_class(json.dumps([
#     {
#         "label": "Random_Forest_Predictions",
#         "data": pred
#     },
#     {
#         "label": "Actual Tx",
#         "data": y_test.tolist()
#     },
#     {
#         "label": "Ridge_Regression_Predictions",
#         "data": lin_pred
#     },
#     {
#         "label": "Actual Sales",
#         "data": y_test.tolist()
#     }
# ], indent=1), content_type='application/json')
