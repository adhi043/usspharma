import React, { useRef, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color, FontSize, baseUrl } from '../../GlobalStyles'
import ArrowLongLeftIcon from 'react-native-heroicons/outline/ArrowLongLeftIcon'
import tw from 'twrnc'
import LockClosedIcon from 'react-native-heroicons/solid/LockClosedIcon'
import CalendarDaysIcon from 'react-native-heroicons/solid/CalendarDaysIcon'
import Modal from "react-native-modal";
import XMarkIcon from 'react-native-heroicons/solid/XMarkIcon'
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment'
import UserCircleIcon from 'react-native-heroicons/solid/UserCircleIcon'
import DocumentPlusIcon from 'react-native-heroicons/solid/DocumentPlusIcon'
import axios from 'axios'
import Loader from '../../Loader'
import Noti from '../../Noti'
import Toast from 'react-native-toast-message'

const ApplyLeave = ({ navigation, route }) => {

    const [show, setShow] = useState(false)

    const { data } = route.params

    const [loading, setLoading] = useState(null);
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



    
    const showToast = (type, head,body) => {
        Toast.show({
            type: type,
            text1: head,
            text2: body,
        });
    }









    const submitLeave = () => {
        setLoading(true)
        if (startDate.length === 0) {
            showToast('error','Error', 'Please select leave date')
            setLoading(false)
        }

        else if (!leaveReason) {
            showToast('error','Error', 'Please enter a reason')
            setLoading(false)
        }

        else {
            const param = {
                employeId: data?.id,
                businessId: data?.businessId,
                startLeaveDateTime: startDate,
                endLeaveDateTime: endDate,
                leaveReason: leaveReason,
                leaveStatus: 'Pending',
                internet: 'online',
            }

            axios.post(`${baseUrl}/employeLeave/create`, param).then(res => {
                if (res.data.status === 'ok') {
                    showToast('success','Success', 'Leave applied successfully')

                    setLoading(false)

                    navigation.goBack()
                }
                else if (res.data.status === 'fail') {
                    showToast('error','Error', res.data.message)
                    setLoading(false)
                }
            }).catch(err => {
                showToast('error','Error', err.message)
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
                                <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Apply For Leave</Text>
                            </View>

                        </View>


                    </View>




                    <TouchableOpacity style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={() => { setShow(true) }}>
                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                            <CalendarDaysIcon size={25} color={Color.white} />
                        </TouchableOpacity>
                        {startDate ? <Text style={{ width: '80%', padding: 0, color: Color.black }} >{moment(startDate).format('DD-MM-YYYY')} to {moment(endDate).format('DD-MM-YYYY')}</Text> : <Text style={{ width: '80%', padding: 0, color: Color.colorGray_100 }} >Select Date</Text>}
                    </TouchableOpacity>





                    <View style={{ padding: 5, backgroundColor: Color.white, elevation: 5, borderRadius: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, minHeight: 170 }}>
                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                            <DocumentPlusIcon size={25} color={Color.white} />
                        </TouchableOpacity>
                        <TextInput style={{ width: '80%', padding: 0, color: Color.black }} placeholder="Enter Leave Reason" placeholderTextColor={Color.colorGray_100} multiline defaultValue={leaveReason} onChangeText={(value) => { setLeaveReason(value) }} />
                    </View>



                    <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', elevation: 5, marginTop: 50 }]} onPress={() => { submitLeave() }}>

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
                            allowRangeSelection={true}
                            todayBackgroundColor={Color.colorMediumseagreen}
                            selectedDayColor={Color.background2}
                            selectedDayTextColor="#000"
                            onDateChange={onDateChange}
                            minDate={new Date()}

                        />
                    </View>


                </View>
            </Modal>



        </>
    )
}

export default ApplyLeave
