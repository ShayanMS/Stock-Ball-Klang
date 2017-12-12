TEMPLATE = app
CONFIG += console c++11
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    app.cpp
LIBS += "C:/Program Files/Microsoft SDKs/Kinect/v2.0_1409/Lib/x86/Kinect20.lib"

INCLUDEPATH += "C:/Program Files/Microsoft SDKs/Kinect/v2.0_1409/inc"
INCLUDEPATH += "C:\Program Files (x86)\Windows Kits\8.1\Include"

DEPENDPATH += "C:/Program Files/Microsoft SDKs/Kinect/v2.0_1409/inc"
INCLUDEPATH += C:\\OpenCV-3.3.0\\opencv\\build\\include

LIBS += -LC:\\OpenCV-3.3.0\\mybuild\\lib\\Debug \
                        -lopencv_photo330d \
                        -lopencv_shape330d \
                        -lopencv_stitching330d \
                        -lopencv_superres330d \
                        -lopencv_ts330d \
                        -lopencv_video330d \
                        -lopencv_videoio330d \
                        -lopencv_videostab330d \
                        -lopencv_calib3d330d \
                        -lopencv_core330d \
                        -lopencv_dnn330d \
                        -lopencv_features2d330d \
                        -lopencv_flann330d \
                        -lopencv_highgui330d \
                        -lopencv_imgcodecs330d \
                        -lopencv_imgproc330d \
                        -lopencv_ml330d \
                        -lopencv_objdetect330d

HEADERS += \
    app.h \
    util.h
