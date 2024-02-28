import React, { useState } from 'react'
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Color, FontSize } from '../../GlobalStyles'
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
import CheckBadgeIcon from 'react-native-heroicons/solid/CheckBadgeIcon'

const Notification = ({ navigation }) => {

    const [show, setShow] = useState(false)
    const [sel, setSel] = useState('All')
    const { width, height } = Dimensions.get('screen')

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



    return (
        <>
            <View style={{ backgroundColor: Color.background, flex: 1 }} >
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
                                <Text style={{ color: Color.white, fontSize: FontSize.headline3_size, fontWeight: '800' }}>Notifications</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={[tw`p-3`, { backgroundColor: Color.background2, borderRadius: 20, flexDirection: 'row', width: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }]} onPress={() => { setShow(true) }}>
                            <CalendarDaysIcon size={18} color={Color.white} />
                        </TouchableOpacity>


                    </View>





                    <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 10, }}>

                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'All' ? Color.white : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                            setSel('All')
                        }}>
                            <Text style={{ color: sel === 'All' ? Color.black : Color.white, fontSize: FontSize.font1_size }}>All</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[tw`p-2`, { backgroundColor: sel === 'Unread' ? Color.white : Color.background2, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 5, elevation: 5, borderColor: Color.white, borderWidth: 1 }]} onPress={() => {
                            setSel('Unread')
                        }}>
                            <Text style={{ color: sel === 'Unread' ? Color.black : Color.white, fontSize: FontSize.font1_size }}>Unread</Text>
                        </TouchableOpacity>


                    </View>




                    <ScrollView showsVerticalScrollIndicator={false} >

                        {/* <View style={{flex:1,backgroundColor:Color.white,borderRadius:20,height:height-240}}> */}

                        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.white, borderRadius: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, marginBottom: 5, }}>
                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                                <CheckBadgeIcon size={25} color={Color.white} />
                            </TouchableOpacity>
                            <View style={{ width: '85%' }}>
                            <Text style={{ color: Color.danger, fontSize: FontSize.font1_size,fontWeight:'700',alignSelf:'flex-end',position:'absolute',top:-5,right:5  }}>Unread</Text>
                                <Text style={{ color: Color.black, fontSize: FontSize.pxRegular_size, fontWeight: 'bold' }}>Leave Approved Successful</Text>
                                <Text style={{ color: Color.black, fontSize: FontSize.font_size, }}>Your leave has been approved by admin. Now you get off for 3 days...</Text>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    
                                    <Text style={{ color: Color.gray2, fontSize: FontSize.font1_size,  }}>10 Jan 2024 04:30 PM</Text>
                                </View>
                            </View>

                        </TouchableOpacity>



                        <TouchableOpacity style={{ padding: 10, backgroundColor: Color.white, borderRadius: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 5 }}>
                            <TouchableOpacity style={[tw`p-2`, { backgroundColor: Color.background2, borderRadius: 20, elevation: 5 }]}>
                                <CheckBadgeIcon size={25} color={Color.white} />
                            </TouchableOpacity>
                            <View style={{ width: '85%' }}>
                            <Text style={{ color: Color.colorMediumseagreen, fontSize: FontSize.font1_size,fontWeight:'700',alignSelf:'flex-end',position:'absolute',top:-5,right:5  }}>Read</Text>
                                <Text style={{ color: Color.black, fontSize: FontSize.pxRegular_size, fontWeight: 'bold' }}>Leave Approved Successful</Text>
                                <Text style={{ color: Color.black, fontSize: FontSize.font_size, }}>Your leave has been approved by admin. Now you get off for 3 days...</Text>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    
                                    <Text style={{ color: Color.gray2, fontSize: FontSize.font1_size,  }}>10 Jan 2024 04:30 PM</Text>
                                </View>

                            </View>

                        </TouchableOpacity>

                        {/* </View> */}


                    </ScrollView>




                </View>
            </View>





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

export default Notification
