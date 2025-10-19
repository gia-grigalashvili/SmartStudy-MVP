import { Users, Calendar, Clock, Loader2, ArrowLeft, BookOpen, User } from 'lucide-react';
import { useGetGroup } from '@/libs/queries/student/groups';
import { useNavigate, useParams } from "react-router-dom";

export default function GroupSingle() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetGroup(id || '');

  console.log('Group data:', data);
  console.log('ID from params:', id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">იტვირთება...</p>
        </div>
      </div>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">ჯგუფი არ მოიძებნა</p>
          <button
            onClick={() => navigate('/groups')}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors"
          >
            უკან დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  const group = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/groups')}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>უკან</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-medium">აქტიური</span>
            </div>
            <div className="absolute bottom-6 left-6">
              <Users className="w-12 h-12 text-white/90" />
            </div>
          </div>

          <div className="p-8">
            {group.subjects && group.subjects.length > 0 ? (
              group.subjects.map((subj: any) => (
                <h1 key={subj.id} className="text-3xl font-bold text-gray-800 mb-3">
                  {subj.subject?.translations?.[0]?.name || 'უცნობი საგანი'}
                </h1>
              ))
            ) : (
              <h1 className="text-3xl font-bold text-gray-800 mb-3">ჯგუფი</h1>
            )}
            
            <p className="text-gray-500 mb-6">
              ჯგუფის ID: {group.id || 'N/A'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">შექმნის თარიღი</p>
                  <p className="font-medium">
                    {group.createdAt ? new Date(group.createdAt).toLocaleDateString('ka-GE') : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">ბოლო განახლება</p>
                  <p className="font-medium">
                    {group.updatedAt ? new Date(group.updatedAt).toLocaleDateString('ka-GE') : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">სტუდენტები</p>
                  <p className="font-medium">{group.students?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-purple-600" />
            საგნები
          </h2>
          
          {group.subjects && group.subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.subjects.map((subj: any) => (
                <div
                  key={subj.id}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {subj.subject?.translations?.[0]?.name || 'უცნობი საგანი'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    საგნის ID: {subj.subject?.id ? subj.subject.id.slice(0, 8) + '...' : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">საგნები არ არის დამატებული</p>
          )}
        </div>

        {/* Students Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <User className="w-7 h-7 text-purple-600" />
            სტუდენტები
          </h2>
          
          {group.students && group.students.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.students.map((student: any) => (
                <div
                  key={student.id}
                  className="bg-gray-50 p-5 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {student.user?.firstName?.[0]?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {student.user?.firstName || ''} {student.user?.lastName || ''}
                      </p>
                      <p className="text-sm text-gray-500">სტუდენტი</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">სტუდენტები არ არიან</p>
          )}
        </div>
      </div>
    </div>
  );
}