import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../../App';
import { colors } from '../theme/colors';
import { globalStyles, viewersListStyles } from '../styles/screens.styles';

type ViewersListScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewersList'>;
};

// TODO: Update user object based on API user object
type Viewer = {
    id: string;
    name: string;
    avatar?: string;
};

// TODO: Replace with API data
const viewers: Viewer[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'Michael Wilson' },
    { id: '6', name: 'Sarah Brown' },
    { id: '7', name: 'David Martinez' },
    { id: '8', name: 'Lisa Anderson' },
];

export default function ViewersListScreen({ navigation }: ViewersListScreenProps) {
    const handleClose = () => {
        navigation.goBack();
    };

    const renderViewerItem = ({ item }: { item: Viewer }) => (
        <View style={viewersListStyles.viewerItem}>
            <View style={viewersListStyles.viewerAvatar}>
                <Text style={viewersListStyles.viewerInitial}>{item.name.charAt(0)}</Text>
            </View>
            <Text style={viewersListStyles.viewerName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={viewersListStyles.container} edges={['top', 'left', 'right']}>
            <View style={viewersListStyles.header}>
                <Text style={viewersListStyles.title}>Active Viewers</Text>
                <TouchableOpacity
                    onPress={handleClose}
                    style={viewersListStyles.closeButton}
                >
                    <X size={24} color={colors.text.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={viewers}
                renderItem={renderViewerItem}
                keyExtractor={item => item.id}
                contentContainerStyle={viewersListStyles.listContent}
            />
        </SafeAreaView>
    );
} 