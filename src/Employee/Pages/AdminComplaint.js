import React, { useRef, useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color, FontSize, baseUrl } from '../../GlobalStyles'
import ArrowLongLeftIcon from 'react-native-heroicons/outline/ArrowLongLeftIcon'
import tw from 'twrnc'
import BoltIcon from 'react-native-heroicons/solid/BoltIcon'
import CalendarDaysIcon from 'react-native-heroicons/solid/CalendarDaysIcon'
import Modal from "react-native-modal";
import XMarkIcon from 'react-native-heroicons/solid/XMarkIcon'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'
import UserCircleIcon from 'react-native-heroicons/solid/UserCircleIcon'
import DocumentPlusIcon from 'react-native-heroicons/solid/DocumentPlusIcon'
import LottieView from 'lottie-react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../Loader'
import Noti from '../../Noti'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const AdminComplaint = ({ navigation, route }) => {

    const { data } = route.params;

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const [sel, setSel] = useState(null)
    const [title, setTitle] = useState(null)
    const [reason, setReason] = useState(null)



    const showToast = (type, head, body) => {
        Toast.show({
            type: type,
            text1: head,
            text2: body,
        });
    }




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











    const submitComplaint = () => {
        setLoading(true)
        if (!sel) {
            showToast('error', 'Error', 'Must select priority')
            setLoading(false)
        }

        else if (!title) {
            showToast('error', 'Error', 'Please add a title')
            setLoading(false)
        }

        else if (!reason) {
            showToast('error', 'Error', 'Please add a reason')
            setLoading(false)
        }

        else {
            const param = {
                employeId: data?.id,
                businessId: data?.businessId,
                priority: sel,
                type: title,
                reason: reason,
                internet: 'online',
            }

            axios.post(`${baseUrl}/complaintAdmin/create`, param).then(res => {
                if (res.data.status === 'ok') {

                    if (newImg) {

                        const params = new FormData();

                        params.append("businessId", data.businessId);
                        params.append("referenceId", res.data.data.id);
                        params.append("reference", "Attachment image Upload");
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
                                const respo = JSON.parse(result)
                                console.log(respo);
                                if (respo.status === 'ok') {
                                    const updatepara = {
                                        attachmentId: respo.data.id,
                                    };

                                    const updateRes = await axios.put(`${baseUrl}/complaintAdmin/update/${res.data.data?.id}`, updatepara);

                                    if (updateRes.data.status === "ok") {

                                        showToast('success', 'Success', 'Complaint admin created successfully!');

                                        setLoading(false)
                                        navigation.goBack()


                                    } else {
                                        showToast('error', 'Error', respo.data.message)
                                        setLoading(false)
                                    }

                                }
                                else if (respo.status === 'fail') {
                                    showToast('error', 'Error', respo.data.message)
                                    setLoading(false)
                                }
                            }).catch(err => {
                                console.log(err);
                                showToast('error', 'Error', err.message)
                                setLoading(false)
                            })

                    }
                    else {
                        showToast('success', 'Success', 'Complaint admin created successfully!');

                        setLoading(false)
                        navigation.goBack()
                    }
                }
                else if (res.data.status === 'fail') {
                    showToast('error', 'Error', res.data.message)
                    setLoading(false)
                }
            }).catch(err => {
                showToast('error', 'Error', err.message)
                setLoading(false)
            })
        }
    }








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
                                <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Admin Complaint</Text>
                            </View>
                        </View>
                    </View>




                    <View style={{ marginVertical: 10, }}>
                        <Text style={{ color: Color.white, fontSize: FontSize.font1_size, marginBottom: 5 }}>Select Priority</Text>


                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 0 }}>

                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'High' ? Color.error : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                                setSel('High')
                            }}>
                                <Text style={{ color: sel === 'High' ? Color.white : Color.white, fontSize: FontSize.font1_size }}>High</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Medium' ? Color.colorMediumseagreen : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                                setSel('Medium')
                            }}>
                                <Text style={{ color: sel === 'Medium' ? Color.white : Color.white, fontSize: FontSize.font1_size }}>Medium</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Low' ? Color.gray2 : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                                setSel('Low')
                            }}>
                                <Text style={{ color: sel === 'Low' ? Color.white : Color.white, fontSize: FontSize.font1_size }}>Low</Text>
                            </TouchableOpacity>


                        </View>

                    </View>


                    <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                            <BoltIcon size={25} color={Color.white} />
                        </TouchableOpacity>
                        <TextInput style={{ width: '80%', padding: 0, color: Color.black }} placeholder="Enter title" placeholderTextColor={Color.colorGray_100} defaultValue={title} onChangeText={(value) => { setTitle(value) }} />
                    </View>





                    <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, minHeight: 170 }}>
                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                            <DocumentPlusIcon size={25} color={Color.white} />
                        </TouchableOpacity>
                        <TextInput style={{ width: '80%', padding: 0, color: Color.black }} placeholder="Enter Reason" placeholderTextColor={Color.colorGray_100} multiline defaultValue={reason} onChangeText={(value) => { setReason(value) }} />
                    </View>





                    <TouchableOpacity style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center', height: 190, marginTop: 10 }} onPress={() => { uploadImage() }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            {
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
                                        <Text style={{ color: Color.black, fontSize: FontSize.pxRegular_size, textAlign: 'center' }}>Upload attachment Image</Text>
                                    </>}
                        </View>

                    </TouchableOpacity>







                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { submitComplaint() }}>

                        <Text style={{ color: Color.white, fontSize: FontSize.pxRegular_size, fontWeight: '600' }}>Submit</Text>

                    </TouchableOpacity>




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
                            HighowRangeSelection={true}
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

export default AdminComplaint
