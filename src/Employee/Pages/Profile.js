import React, { useCallback, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color, FontSize, baseUrl } from '../../GlobalStyles'
import ArrowLongLeftIcon from 'react-native-heroicons/outline/ArrowLongLeftIcon'
import tw from 'twrnc'
import LockClosedIcon from 'react-native-heroicons/solid/LockClosedIcon'
import CalendarDaysIcon from 'react-native-heroicons/solid/CalendarDaysIcon'
import Modal from "react-native-modal";
import XMarkIcon from 'react-native-heroicons/solid/XMarkIcon'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'
import ClockIcon from 'react-native-heroicons/solid/ClockIcon'
import DocumentPlusIcon from 'react-native-heroicons/solid/DocumentPlusIcon'
import axios from 'axios'
import Loader from '../../Loader'
import Noti from '../../Noti'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import ArrowUpRightIcon from 'react-native-heroicons/outline/ArrowUpRightIcon'
import LottieView from 'lottie-react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message'

const Profile = ({ navigation }) => {

    const [show, setShow] = useState(false)
    const [data, setData] = useState(false)
    const [img, setImg] = useState(null)
    const [newImg, setNewImg] = useState(null)

    const { width, height } = Dimensions.get('screen')

    // const {data}=route.params

    const [leaveReason, setLeaveReason] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDateChange = (date, type) => {
        if (type === "END_DATE") {
            setSelectedEndDate(date);
        } else {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        }
    };

    const minDate = new Date(); // Today
    const maxDate = new Date(2017, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";




    const [loading, setLoading] = useState(false)


    const showToast = (type, head,body) => {
        Toast.show({
            type: type,
            text1: head,
            text2: body,
        });
    }
    
    
    
    





    const submitImg = () => {
        setLoading(true)
        if (!newImg) {
            showToast('error','Error', 'Please add image')
            setLoading(false)
        }

        else {
            const params = new FormData();

            params.append("businessId", data.businessId);
            params.append("referenceId", data.id);
            params.append("reference", "Profile image Upload");
            params.append("internet", "online");
            params.append("photo", {
                uri: newImg?.path,
                type: newImg?.mime,
                name: 'image.jpg',
            });


            var requestOptions = {
                method: 'POST',
                body: params,
                redirect: 'follow'
            };


            fetch(`${baseUrl}/image/create`, requestOptions)
                .then(response => response.text())
                .then(async (result) => {
                    const res = JSON.parse(result)
                    console.log(res);
                    if (res.status === 'ok') {
                        const updatepara = {
                            imageId: res.data.id,
                        };

                        const updateRes = await axios.put(`${baseUrl}/employe/update/${data?.id}`, updatepara);

                        if (updateRes.data.status === "ok") {
                            showToast('success','Success', 'Profile image updated successfully!');
                            setLoading(false)
                        } else {
                            showToast('error','Error', res.data.message)
                            setLoading(false)
                        }

                    }
                    else if (res.status === 'fail') {
                        showToast('error','Error', res.data.message)
                        setLoading(false)
                    }
                }).catch(err => {
                    showToast('error','Error', err.message)
                    setLoading(false)
                })
        }
    }




    useFocusEffect(
        useCallback(async () => {
            setLoading(true)
            const mydata = JSON.parse(await AsyncStorage.getItem('data'))



            axios.get(`${baseUrl}/employe/get/${mydata?.id}`).then(res => {
                if (res.data.status === 'ok') {
                    setData(res.data.data);
                    axios.get(`${baseUrl}/image/get/${res.data.data?.imageId}`).then(resp => {
                        if (resp.data.status === 'ok') {
                          setImg(resp.data?.data?.photo);
                          setLoading(false)
                        }
                        else if (resp.data.status === 'fail') {
                          showToast('error','Error', resp.data.message)
                          setLoading(false)
                        }
                      }).catch(err => {
                        console.log(err);
                        showToast('error','Error', err.message)
                        setLoading(false)
                      })
                }
            }).catch(err => {
                showToast('error','Error', err.message)
                setLoading(false)
            })

        }, [])
    )




    const uploadImage = async () => {
        try {
            ImagePicker.openPicker({
                mediaType: 'photo'
            }).then(image => {
                setNewImg(image)
                console.log(image);
            });
        } catch (error) {
            console.log('error', error);
        }
    };














    return (
        <>
            {loading ? <Loader /> : null}
            <ScrollView style={{ backgroundColor: Color.background }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20, paddingTop: 40 }}>

                    <View style={{ width: 270, height: 270, borderRadius: 200, backgroundColor: Color.background2, position: 'absolute', left: -50, top: -50, zIndex: -1 }} />

                    <View style={[tw`flex-row justify-between items-center mb-1`, { paddingBottom: 10 }]}>
                        <View style={tw`flex-row justify-between items-center gap-x-3`}>
                            <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                navigation.goBack()
                            }}>
                                <ArrowLongLeftIcon size={25} color={Color.white} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Profile</Text>
                            </View>

                        </View>


                    </View>




                    <TouchableOpacity style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%', alignSelf: 'center', height: 190 }} onPress={() => { uploadImage() }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            {img && !newImg ?
                                <Image source={{ uri: img }} style={{ borderRadius: 20, width: 200, height: 160 }} resizeMode='contain' /> :
                                newImg ?

                                    <>
                                        <Image source={{ uri: newImg?.path }} style={{ borderRadius: 20, width: 200, height: 160 }} resizeMode='contain' />

                                        <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: -5, right: 0, backgroundColor: Color.black, }]} onPress={() => { setNewImg(null) }}>
                                            <XMarkIcon size={20} color={Color.white} />
                                        </TouchableOpacity>
                                    </>



                                    :

                                    <>
                                        <LottieView source={require('../../assets/SRoEH1gske.json')} autoPlay loop style={{ width: 200, height: 160 }} />
                                        <Text style={{ color: Color.black, fontSize: FontSize.pxRegular_size, textAlign: 'center' }}>Upload Image</Text>
                                    </>}
                        </View>

                    </TouchableOpacity>

                    <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.black, fontSize: FontSize.headline2_size, fontWeight: '800' }}>{data?.firstName + " " + data?.lastName}</Text>
                        <Text style={{ color: Color.gray2, fontSize: FontSize.pxRegular_size, fontWeight: '400' }}>{data?.email}</Text>
                    </View>




                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '48%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 10 }]} onPress={() => { submitImg() }}>

                            <Text style={{ color: Color.white, fontSize: FontSize.pxRegular_size, fontWeight: '600' }}>Update Image</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.error, borderRadius: 20, flexDirection: 'row', width: '48%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 10 }]} onPress={() => { navigation.navigate('Login') }}>

                            <Text style={{ color: Color.white, fontSize: FontSize.pxRegular_size, fontWeight: '600' }}>Logout</Text>

                        </TouchableOpacity>


                    </View>










                    <View style={{ marginTop: 20 }}>

                        <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold', marginBottom: 10 }}>Work Schedule</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>


                            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>Shift Start</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{moment(data?.workStartTime).format('HH:mm A')}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>⏰</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Shift End</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{moment(data?.workEndTime).format('HH:mm A')}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>⏰</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Working Shift</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.regularShift}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>🔄</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Working Duration</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.hoursperDay} hours</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>⏳</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>



                        </View>



                    </View>







                    <View style={{ marginTop: 20 }}>

                        <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold', marginBottom: 10 }}>Employment Details</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>



                            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Designation</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.role}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>🏷️</Text>
                                    </TouchableOpacity>
                                </View>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Department</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.department}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>🏢</Text>
                                    </TouchableOpacity>
                                </View>




                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Joining Date</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{moment(data?.employmentStartDate).format('MMM DD, YYYY')}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>📅</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Certificate</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.certificateImage ? 'Download' : 'Available on Demand'}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>📜⬇️</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Experience Letter</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.experienceLetterImage ? 'Download' : 'Available on Demand'}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>📄⬇️</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>



                        </View>



                    </View>







                    <View style={{ marginTop: 20 }}>

                        <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: 'bold', marginBottom: 10 }}>Personal Details</Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>



                            <View style={{ padding: 15, borderRadius: 20, width: '100%', elevation: 5, backgroundColor: Color.white }}>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Phone Number</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.phone}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>📱</Text>
                                    </TouchableOpacity>
                                </View>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Date of Birth</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{moment(data?.dob).format('MMM DD, YYYY')}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>🎂</Text>
                                    </TouchableOpacity>
                                </View>




                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Gender</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.gender}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>⚧️</Text>
                                    </TouchableOpacity>
                                </View>





                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700' }}>Address</Text>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '400', marginBottom: 10 }}>{data?.address} {data?.city}, {data?.country}</Text>
                                    </View>
                                    <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.colorGray_100, borderRadius: 20 }]} onPress={() => {
                                        // navigation.navigate('AttendanceReport', { data: data }) 
                                    }}>
                                        <Text style={{ color: Color.black, fontSize: FontSize.size_mini, fontWeight: '700', }}>🏠</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>



                        </View>



                    </View>










                </View>
            </ScrollView>





            <Modal isVisible={show} style={{ width: '100%', margin: 0 }}  >
                <View style={{ backgroundColor: Color.white, borderRadius: 20, padding: 20, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={[tw`flex-row gap-x-3 items-center`, { position: 'absolute', top: 10, right: 10 }]} onPress={() => { setShow(false) }}>
                        <XMarkIcon size={18} color={Color.gray2} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.primary, borderRadius: 20 }]}>
                        <CalendarDaysIcon size={25} color={Color.white} />
                    </TouchableOpacity>
                    <Text style={{ color: Color.black, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Calendar</Text>


                    <View style={{ paddingHorizontal: 20 }}>
                        <CalendarPicker
                            startFromMonday={true}
                            allowRangeSelection={true}
                            todayBackgroundColor={Color.colorMediumseagreen}
                            selectedDayColor={Color.background2}
                            selectedDayTextColor="#000"
                            onDateChange={onDateChange}

                        />
                    </View>


                </View>
            </Modal>



        </>
    )
}

export default Profile
