/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react'
// react plugin used to create charts
import { Line } from 'react-chartjs-2'
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap'
import axios from 'axios'
// core components

function Ridrige() {
  const [dataDbd, setDataDbd] = useState([])
  const [dataBMKG, setDataBMKG] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isLoadingBmkg, setLoadingBmkg] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/ridge/dbd')
      .then(async (data) => {
        setDataDbd(data?.data)

        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        alert('Terjadi Masalah, coba lagi!')
      })

    axios
      .get('http://localhost:4000/api/ridge/bmkg')
      .then(async (data) => {
        setDataBMKG(data?.data)

        setLoadingBmkg(false)
      })
      .catch(() => {
        setLoadingBmkg(false)
        alert('Terjadi Masalah, coba lagi!')
      })
  }, [])

  const chartOptions = {
    options: {
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        y: {
          ticks: {
            color: '#9f9f9f',
            beginAtZero: false,
            maxTicksLimit: 10,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 20,
            color: '#9f9f9f',
          },
        },
      },
    },
  }

  if (isLoading && isLoadingBmkg) {
    return null
  }
  
  const renderDBD = {
    data: (canvas) => ({
      labels: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
      ],
      datasets: [
        {
          label: "Ridge_Predictions",
          borderColor: '#0096FF',
          pointRadius: 3,
          pointHoverRadius: 3,
          borderWidth: 4,
          tension: 0.1,
          fill: false, 
          data: dataBMKG[0]?.data.map((item) => item[0]),
        },
        {
          label: "PenderitaDBD",
          borderColor: '#EF5B0C',
          pointRadius: 3,
          pointHoverRadius: 3,
          borderWidth: 4,
          tension: 0.1,
          fill: false,
          data: dataBMKG[1]?.data.map((item) => item[0]),
        },
      ],
    }),
  }

  const renderBMKG = {
    data: (canvas) => ({
      labels: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
      ],
      datasets: [
        {
          label: "Ridge_Predictions",
          borderColor: '#0096FF',
          pointRadius: 3,
          pointHoverRadius: 3,
          borderWidth: 4,
          tension: 0.1,
          fill: false, 
          data: dataDbd[0]?.data,
        },
        {
          label: "RR",
          borderColor: '#EF5B0C',
          pointRadius: 3,
          pointHoverRadius: 3,
          borderWidth: 4,
          tension: 0.1,
          fill: false,
          data: dataDbd[1]?.data.map((item) => item[0]),
        },
      ],
    }),
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Grafik Prediksi Penderita DBD</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={renderDBD.data}
                  options={chartOptions.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Grafik Prediksi Curah Hujan BMKG</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={renderBMKG.data}
                  options={chartOptions.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="row">
          <div className="col-md-4">
            <div className="card "></div>
          </div>
          <div className="col-md-12">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-title">
                  ANALISIS PENGARUH IKLIM TERHADAP INFEKSI DEMAM BERDARAH
                </h5>
                <p className="card-category">
                  KECAMATAN TANJUNG PRIOK, KOTA ADMINISTRASI JAKARTA UTARA
                </p>
              </div>
              <div className="card-body">
                <canvas id="speedChart" width="100" height="0.1"></canvas>
                <p>
                  Grafik diatas merupakan grafik penderita DBD dan BMKG Pada
                  Tahun 2015 - 2020, Grafik diatas nantinya akan dianalisis
                  menggukanan time series & digunakan untuk memprediksi jumlah
                  kasus DBD dengan pengaruh iklim di Kecamatan Tanjung Priok
                  Jakarta Utara. Dengan menggunakan 3 Metode yaitu Ridge
                  Regression, ELM, GSTAR maka metode tersebut akan dibandingkan
                  keakuratannya.
                </p>
              </div>
              <div className="card-footer">
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check"></i> Data information certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ridrige
