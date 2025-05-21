import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { X } from 'lucide-react-native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { viewersListStyles } from '../styles/screens.styles';
import { colors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

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
    const { theme } = useTheme();
    const handleClose = () => {
        navigation.goBack();
    };

    const renderViewerItem = ({ item }: { item: Viewer }) => (
        <View style={[viewersListStyles.viewerItem, {backgroundColor: theme.background}]}>
            <View style={[viewersListStyles.viewerAvatar,{backgroundColor: theme.primary}]}>
                <Text style={viewersListStyles.viewerInitial}>{item.name.charAt(0)}</Text>
            </View>
            <Text style={[viewersListStyles.viewerName,{color: theme.text.primary}]}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[viewersListStyles.container,{backgroundColor: theme.background}]} edges={['top', 'left', 'right']}>
            <View style={viewersListStyles.header}>
                <Text style={[viewersListStyles.title, {color: theme.text.primary}]}>Active Viewers</Text>
                <TouchableOpacity
                    onPress={handleClose}
                    style={viewersListStyles.closeButton}
                >
                    <X size={24} color={theme.text.primary} />
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