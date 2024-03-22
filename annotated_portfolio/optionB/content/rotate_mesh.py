import trimesh
from trimesh import creation, transformations
import math

mesh=trimesh.load_mesh('chairPrueba_laplacianFilter_lamb_0.08.stl')
mesh.show()
angle = math.pi 
direction = [1, 0, 0]
center = [0, 0, 0]
rot_matrix = transformations.rotation_matrix(angle, direction, center)

mesh.apply_transform(rot_matrix)
mesh.export('rotated.stl')
mesh.show()
