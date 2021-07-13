import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import api from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  const handleAddProject = async () => {
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Iago',
    });

    setProjects([...projects, response.data]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
      <SafeAreaView style={styles.container}>
        {projects.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.feedback}>Adicione um primeiro projeto</Text>
          </View>
        ) : (
          <FlatList
            data={projects}
            keyExtractor={(project) => project.id}
            renderItem={({ item: project }) => {
              const handleDeleteProject = async (projectId) => {
                const newProjects = projects.filter(
                  (project) => project.id !== projectId
                );

                await api.delete(`/projects/${projectId}`);

                setProjects(newProjects);
              };

              return (
                <View style={styles.projectContainer}>
                  <ScrollView>
                    <Text style={styles.project}>{project.title}</Text>
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => handleDeleteProject(project.id)}
                  >
                    <Text style={styles.buttonText}>Apagar</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
  },

  feedback: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },

  project: {
    fontSize: 20,
    color: '#000',
  },

  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    padding: 10,
    marginBottom: 10,

    backgroundColor: '#FFF',
  },

  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,

    borderRadius: 4,
    backgroundColor: 'red',
  },

  button: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',

    margin: 20,

    borderRadius: 4,
    backgroundColor: 'blue',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default App;
