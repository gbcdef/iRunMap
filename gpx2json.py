#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import xml.dom.minidom as xdom
# import pandas as pd
import os, json, sys


def proc_xml(gpxPath):

    dom_tree = xdom.parse(gpxPath)
    collection = dom_tree.documentElement

    trkpts = collection.getElementsByTagName("trkpt")

    def getdata(obj, name):
        return obj.getElementsByTagName(name)[0].childNodes[0].data

    lats, lons, eles = [], [], []
    times = []
    for trkpt in trkpts:
        lat = trkpt.getAttribute("lat")
        lon = trkpt.getAttribute("lon")
        ele = getdata(trkpt, "ele")
        time = getdata(trkpt, "time")
        if lat=='0' or lon=='0':
            continue
        lats.append(float(lat))
        lons.append(float(lon))
        eles.append(float(ele))
        times.append(time[:19])

    datas = {'lat': lats, 'lon': lons, 'ele': eles}

    fileDir, fileName = os.path.split(gpxPath)
    jsonDir = os.path.join(fileDir, 'jsons')
    if not os.path.exists(jsonDir):
        os.mkdir(jsonDir)

    jsonPath = os.path.join(jsonDir, fileName) + '.json'
    # print json.dumps(datas)
    with open(jsonPath, 'w') as f:
        f.write(json.dumps(datas))


def main():
    if len(sys.argv) < 2:
        print 'specify the gpx file path'
        return

    fileList = sys.argv[1:]
    for p in fileList:
        if os.path.isfile(p):
            gpxPath = os.path.abspath(p)
            print 'Processing'+str(gpxPath)
            try:
                proc_xml(p)
                print 'Coresponding JSON file was generated.'
            except:
                print 'somthing was wrong'

if __name__ == '__main__':
    main()
