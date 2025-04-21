import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../../App';
import { colors } from '../theme/colors';
import { globalStyles } from '../styles/screens.styles';

type ViewersListScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ViewersList'>;
};

// Mock data for viewers - would be replaced with API data
type Viewer = {
    id: string;
    name: string;
    avatar?: string;
};

export default function ViewersListScreen({ navigation }: ViewersListScreenProps) {
    const handleClose = () => {
        navigation.goBack();
    };

    // Mock viewers data - would be replaced with API data
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

    const renderViewerItem = ({ item }: { item: Viewer }) => (
        <View style={styles.viewerItem}>
            <View style={styles.viewerAvatar}>
                <Text style={styles.viewerInitial}>{item.name.charAt(0)}</Text>
            </View>
            <Text style={styles.viewerName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Active Viewers</Text>
                <TouchableOpacity
                    onPress={handleClose}
                    style={styles.closeButton}
                >
                    <X size={24} color={colors.text.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={viewers}
                renderItem={renderViewerItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    closeButton: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
    },
    viewerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    viewerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    viewerInitial: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewerName: {
        fontSize: 16,
        color: colors.text.primary,
    },
}); 